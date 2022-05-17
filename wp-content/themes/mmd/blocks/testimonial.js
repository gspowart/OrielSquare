import { registerBlockType } from "@wordpress/blocks"
import { RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/testimonial", {
  title: "OS -  Testimonial",
  supports: {
    align: ["full"]
  },
  attributes: {
    text: {
      type: "string",
      default: ""
    }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const MY_TEMPLATE = [
    ["core/paragraph", { placeholder: "Testimonial text" }],
    ["core/paragraph", { placeholder: "Persona name" }]
  ]
  const blockProps = useBlockProps({ className: `glide__slide` })
  const innerBlocksProps = useInnerBlocksProps({ className: "content-area content-area--centre" }, { allowedBlocks: ["core/paragraph", "blocktheme/button"] }, { template: MY_TEMPLATE })

  function handleTextChange(x) {
    props.setAttributes({ text: x })
  }

  return (
    <>
      <div {...blockProps}>
        <div {...innerBlocksProps} />
      </div>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
