import { registerBlockType } from "@wordpress/blocks"
import { CheckboxControl } from "@wordpress/components"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { store as coreStore } from "@wordpress/core-data"
import { SelectControl } from "@wordpress/components"

registerBlockType("blocktheme/casestudies", {
  title: "OS -  Case Studies",
  supports: {
    align: ["full"]
  },
  attributes: {},
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const CS_TEMPLATE = [
    ["blocktheme/casestudygroup", { className: "case-studies__featured-area", title: "Featured Case Studies" }],
    ["blocktheme/casestudygroup", { className: "case-studies__standard-area", title: "Standard Case Studies" }]
  ]

  const blockProps = useBlockProps({ className: "page-section page-section--aqua--large page-section--padding-medium" })
  const innerBlocksProps = useInnerBlocksProps({ className: "case-studies" }, { template: CS_TEMPLATE, allowedBlocks: ["blocktheme/casestudychooser"], templateLock: "all" })

  return (
    <>
      <div {...blockProps}>
        <div class="wrapper">
          <div {...innerBlocksProps} />
        </div>
      </div>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
