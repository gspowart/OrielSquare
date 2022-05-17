import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/teamdirectors", {
  title: "OS -  Team Directors Block",
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
  const blockProps = useBlockProps({ className: "team__directors" })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/teamdirector"], template: [["blocktheme/teamdirector"]] })
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
