// Stub. T5 builds this against the picture library; T6 wires it into the
// project form. The props below are frozen — both of those tasks are written
// against this exact shape, so nothing here may be renamed or added to:
//
//   <ImagePicker value={string|null} onChange={(id) => {}} label={string} />
//
// `value` is a library id or a legacy URL, and onChange receives a library id.
// Until T5 lands this renders its own name and calls nothing, so a form that
// already imports it neither crashes nor quietly loses a picture.
export default function ImagePicker({
  value: _value,
  onChange: _onChange,
  label: _label,
}) {
  return <div className="image-picker">ImagePicker</div>;
}
