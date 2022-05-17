import { registerBlockType } from "@wordpress/blocks"
import { CheckboxControl } from "@wordpress/components"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { store as coreStore } from "@wordpress/core-data"
import { SelectControl } from "@wordpress/components"

registerBlockType("blocktheme/casestudygroup", {
  title: "OS -  Case Study Group",
  supports: {
    align: ["full"]
  },
  attributes: {
    className: { type: "string" },
    title: { type: "string" },
    csLayoutType: { type: "string", default: "list" }
  },
  usesContext: ["blocktheme/csLayoutType"],
  parent: ["blocktheme/casestudies"],
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  props.setAttributes({ csLayoutType: props.context["blocktheme/csLayoutType"] })
  const CS_TEMPLATE = [["blocktheme/casestudychooser"]]

  const blockProps = useBlockProps({ className: props.attributes.className })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template: CS_TEMPLATE, allowedBlocks: ["blocktheme/casestudychooser"], templateLock: false })

  return (
    <>
      <h3 class="headline headline--h3 case-study__editor-title">{props.attributes.title}</h3>

      <div {...innerBlocksProps} />
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
