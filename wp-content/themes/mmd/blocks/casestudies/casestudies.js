import { registerBlockType } from "@wordpress/blocks"
import { InspectorControls, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { ToggleControl, PanelBody, PanelRow } from "@wordpress/components"

registerBlockType("blocktheme/casestudies", {
  title: "OS -  Case Studies",
  supports: {
    align: ["full"]
  },
  attributes: {
    showFilter: { type: "boolean", default: false }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const CS_TEMPLATE = [["blocktheme/casestudygroup", { className: "case-studies__standard-area", title: "Case Studies" }]]

  const blockProps = useBlockProps({ className: "page-section page-section--aqua--large page-section--padding-medium" })
  const innerBlocksProps = useInnerBlocksProps({ className: "case-studies" }, { template: CS_TEMPLATE, allowedBlocks: ["blocktheme/casestudychooser"], templateLock: "all" })

  return (
    <>
      <InspectorControls>
        <PanelBody title="Filter" initialOpen={true}>
          <PanelRow>
            <ToggleControl label="Show/Hide Filter" help={props.attributes.showFilter ? "Filter showing" : "Filter hidden"} checked={props.attributes.showFilter} onChange={value => props.setAttributes({ showFilter: value })} />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
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
