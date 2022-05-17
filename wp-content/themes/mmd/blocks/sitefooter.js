import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/sitefooter", {
  title: "OS -  Site Footer",
  supports: {
    align: ["full"]
  },
  attributes: {},
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  //prettier-ignore
  const TEMPLATE = [
    ["blocktheme/imagerow", {},],
    ["blocktheme/sitefootercontent", { }]
  ]

  const blockProps = useBlockProps({ className: `wrapper` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/imagerow", "blocktheme/columncontent"], template: TEMPLATE })
  return (
    <>
      <div class="site-footer">
        <div {...blockProps}>{innerBlocksProps.children}</div>
      </div>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
