// Stub. T5 builds this into the real body editor; T6 wires it into the project
// form. The props below are frozen — both of those tasks are written against
// this exact shape, so nothing here may be renamed or added to:
//
//   <BlockEditor blocks={array} lang={string} onChange={(blocks) => {}} />
//
// `blocks` is the v2 array, onChange receives the whole next array, and `lang`
// is the language tab the editor is currently showing. Until T5 lands this
// renders its own name and calls nothing, so an importing form still mounts.
export default function BlockEditor({
  blocks: _blocks,
  lang: _lang,
  onChange: _onChange,
}) {
  return <div className="block-editor">BlockEditor</div>;
}
