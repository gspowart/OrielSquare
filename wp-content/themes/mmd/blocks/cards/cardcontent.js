import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/cardcontent", {
  title: "OS -  Card Content",
  parent: ["blocktheme/columns-4060", "blocktheme/columns-5050", "blocktheme/columns-full"],
  supports: {
    align: ["full"]
  },
  attributes: {
    className: {
      type: "string"
    }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const MY_TEMPLATE = [
    ["blocktheme/heading", { placeholder: "Column Heading", size: "h3", tagName: "h2", uppercase: "headline--uppercase" }],
    ["core/paragraph", { placeholder: "Insert paragraph text" }],
    ["blocktheme/button", { placeholder: "Enter Button Text" }]
  ]
  const blockProps = useBlockProps({ className: `os-card__text` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template: MY_TEMPLATE })

  return <div {...innerBlocksProps} />
}

function SaveComponent() {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
