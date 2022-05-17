import { RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType("blocktheme/strapline", {
  title: "OS -  Strapline",
  attributes: {
    text: { type: "string" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  function handleTextChange(x) {
    props.setAttributes({ text: x })
  }
  const blockProps = useBlockProps({ className: `strapline` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, {})

  return (
    <>
      <RichText {...blockProps} allowedFormats={["core/bold", "core/italic"]} tagName="span" placeholder="Enter your strapline" value={props.attributes.text} onChange={handleTextChange} />
    </>
  )
}

function SaveComponent(props) {
  return <RichText.Content tagName="span" value={props.attributes.text} className={`strapline`} />
}
