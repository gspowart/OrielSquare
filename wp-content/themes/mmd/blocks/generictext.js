import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/generictext", {
  title: "OS -  Generic Text",
  supports: {
    align: ["full"]
  },
  attributes: {
    wrapperClassName: { type: "string", default: "" },
    wrapperTag: { type: "string", default: "span" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  //prettier-ignore
  const TEMPLATE = [
    ["core/paragraph"]
  ]

  const blockProps = useBlockProps({ className: props.attributes.wrapperClassName })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["core/paragraph"], template: TEMPLATE })
  const TagWrapper = props.attributes.wrapperTag

  return (
    <>
      <TagWrapper {...innerBlocksProps}></TagWrapper>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
