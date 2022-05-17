import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType("blocktheme/job", {
  title: "OS -  Job",
  attributes: {
    text: { type: "string" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const DEFAULT_TEMPLATE = [["blocktheme/heading", { size: "h4", textColor: "headline--white", placeholder: "Job Title" }], ["core/paragraph"], ["blocktheme/button"]]
  const blockProps = useBlockProps({ className: `content-area content-area--transparent` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template: DEFAULT_TEMPLATE })

  return <div {...innerBlocksProps} />
}

function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
