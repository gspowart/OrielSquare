import { registerBlockType } from "@wordpress/blocks"
import { CheckboxControl } from "@wordpress/components"
import { useBlockProps, useInnerBlocksProps, RichText } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { store as coreStore } from "@wordpress/core-data"
import { SelectControl } from "@wordpress/components"

registerBlockType("blocktheme/casestudycarousel", {
  title: "OS -  Case Studies Carousel",

  supports: {
    align: ["full"]
  },
  attributes: {
    blockTitle: { type: "string", default: "Our Work" },
    csLayoutType: { type: "string", default: "carousel" }
  },
  providesContext: { "blocktheme/csLayoutType": "csLayoutType" },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const CS_TEMPLATE = [["blocktheme/casestudygroup", { className: "case-studies__standard-area", title: "Chosen Case Studies" }]]

  const blockProps = useBlockProps({ className: "page-section page-section--aqua page-section--padding-medium" })
  const innerBlocksProps = useInnerBlocksProps({ className: "case-studies" }, { template: CS_TEMPLATE, allowedBlocks: ["blocktheme/casestudychooser"], templateLock: "all" })

  return (
    <>
      <div {...blockProps}>
        <div class="wrapper">
          <RichText tagName="h2" className="headline headline--white headline--centre headline--h2 headline--uppercase" placeholder="Block Title" value={props.attributes.blockTitle} onChange={value => props.setAttributes({ blockTitle: value })}></RichText>
          <div class="row row--gutters">
            <div class="row__large-12 row--center-content content-area">
              <div {...innerBlocksProps} />
            </div>
          </div>
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
