import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/sitefootercontent", {
  title: "OS -  Site Footer Content Block",
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
    ["blocktheme/genericimage", { wrapperClassName: "site-footer__logo", wrapperTag: "div"},],
    ["blocktheme/generictext", { wrapperClassName: "site-footer__text", wrapperTag: "div" }],
    ["blocktheme/generictext", { wrapperClassName: "site-footer__navigation", wrapperTag: "div" }]
  ]

  const blockProps = useBlockProps({ className: `site-footer__content` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/genericimage", "blocktheme/generictext"], template: TEMPLATE })
  return (
    <>
      <div {...innerBlocksProps} />
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
