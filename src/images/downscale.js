// Turning a phone photo into something a browser can hold onto. A modern phone
// writes 4 MB or more per picture, and a handful of those would fill the
// storage this site is allowed before the gallery held anything worth looking
// at. Everything here is plain canvas work — the site has no backend and no
// image dependency, and it is not getting one for a resize.

// The longest edge a stored picture may have. 2000px still looks sharp on a
// retina screen at any size this site draws a picture, and it is roughly a
// tenth of the bytes of an untouched phone photo.
export const MAX_EDGE = 2000;

// JPEG quality for the re-encode. 0.82 is the point where the file stops
// shrinking much and artefacts have not started showing on foliage yet, which
// is most of what this site photographs.
export const JPEG_QUALITY = 0.82;

// Everything that gets re-encoded comes out as JPEG. A garden photo has no
// transparency to lose and JPEG beats PNG by an order of magnitude on it.
export const OUTPUT_MIME = 'image/jpeg';

// Errors carry a stable `code` so the UI can pick a message without matching
// on English text. This helper lives in the lower module of the two on
// purpose: imageStore.js imports downscale.js, never the other way round, so
// the shared piece has to sit at the bottom or the two files form a cycle.
// The full list of codes is documented in imageStore.js.
export function imageError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

// A picture that is already inside the cap is stored byte-for-byte, so this
// has to report the source dimensions rather than guess them from the file.
// Two ways of decoding: createImageBitmap where it exists because it decodes
// off the main thread, and an <img> element everywhere else. The bitmap path
// falling over is not fatal — some browsers reject formats they will happily
// render in an element — so a rejection there tries the element before giving
// up on the file.
function decode(file) {
  if (typeof createImageBitmap === 'function') {
    return createImageBitmap(file).then(
      (bitmap) => ({
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        release: () => bitmap.close(),
      }),
      () => decodeWithElement(file),
    );
  }
  return decodeWithElement(file);
}

function decodeWithElement(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const element = new Image();

    element.onload = () => {
      // An SVG with no intrinsic size decodes to nothing to draw. Treat it as
      // a file we cannot use rather than storing a 0x0 picture.
      if (!element.naturalWidth || !element.naturalHeight) {
        URL.revokeObjectURL(url);
        reject(imageError('not-image', 'The image has no usable dimensions.'));
        return;
      }
      resolve({
        source: element,
        width: element.naturalWidth,
        height: element.naturalHeight,
        // The URL has to outlive the load, because the canvas draws from the
        // element afterwards. Whoever asked for the decode revokes it.
        release: () => URL.revokeObjectURL(url),
      });
    };

    element.onerror = () => {
      URL.revokeObjectURL(url);
      reject(imageError('not-image', 'The browser could not decode this file as an image.'));
    };

    element.src = url;
  });
}

function encode(decoded, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    return Promise.reject(imageError('failed', 'This browser gave no 2d canvas context.'));
  }

  // JPEG has no alpha channel, so a transparent PNG would come out with black
  // wherever it used to be see-through. White is the page background, which
  // makes a logo dropped into the picker look the way the person expected.
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);

  try {
    context.drawImage(decoded.source, 0, 0, width, height);
  } catch {
    return Promise.reject(imageError('failed', 'The image could not be drawn to a canvas.'));
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(imageError('failed', 'The browser produced no data when encoding the image.'));
          return;
        }
        resolve(blob);
      },
      OUTPUT_MIME,
      JPEG_QUALITY,
    );
  });
}

// Resolves with { blob, mime, width, height } — never with the caller's File,
// unless the picture was already small enough, in which case the original
// blob is handed straight back untouched. That is deliberate: re-encoding a
// picture that is already within the cap costs quality and buys nothing. The
// trade-off is that an already-small file stays whatever size it arrived at,
// so a 1200px screenshot saved as a huge PNG is stored as a huge PNG. The
// pictures this library is for are photographs, and those are all over the
// cap.
export function downscale(file) {
  if (!file || typeof file !== 'object' || typeof file.type !== 'string') {
    return Promise.reject(imageError('not-image', 'No file was given.'));
  }
  if (!file.type.startsWith('image/')) {
    return Promise.reject(imageError('not-image', `"${file.type || 'unknown'}" is not an image type.`));
  }

  return decode(file).then((decoded) => {
    const longest = Math.max(decoded.width, decoded.height);

    if (longest <= MAX_EDGE) {
      decoded.release();
      return {
        blob: file,
        mime: file.type,
        width: decoded.width,
        height: decoded.height,
      };
    }

    const scale = MAX_EDGE / longest;
    // Round rather than floor, and never to zero: a 4000x1 panorama would
    // otherwise scale to a canvas of height 0, which throws.
    const width = Math.max(1, Math.round(decoded.width * scale));
    const height = Math.max(1, Math.round(decoded.height * scale));

    return encode(decoded, width, height).then(
      (blob) => {
        decoded.release();
        return { blob, mime: OUTPUT_MIME, width, height };
      },
      (error) => {
        decoded.release();
        throw error;
      },
    );
  });
}
