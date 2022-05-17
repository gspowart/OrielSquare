import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/teammembers", {
  title: "OS -  Team Members Block",
  supports: {
    align: ["full"]
  },
  parent: ["blocktheme/team"],
  attributes: {},
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const blockProps = useBlockProps({ className: "team__members" })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/teammember"], template: [["blocktheme/teammember"]] })
  return (
    <>
      <div {...innerBlocksProps} />
    </>
  )
}
function SaveComponent() {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
