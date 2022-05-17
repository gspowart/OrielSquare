import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/imagerow", {
  title: "OS -  Image Row",
  supports: {
    align: ["full"]
  },
  attributes: {},
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const blockProps = useBlockProps({ className: `image-flexbox` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/image"] })
  return <div {...innerBlocksProps} />
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
