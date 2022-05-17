import { registerBlockType } from "@wordpress/blocks"
import { RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/team", {
  title: "OS -  Team Block",
  supports: {
    align: ["full"]
  },
  attributes: { text: { type: "string", default: "Our Team" } },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  function handleTextChange(x) {
    props.setAttributes({ text: x })
  }

  const blockProps = useBlockProps({ className: "team" })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/teamdirectors", "blocktheme/teammembers", "blocktheme/cta"] })
  return (
    <>
      <div class="page-section page-section--aqua page-section--padding-medium">
        <div class="wrapper">
          <RichText allowedFormats={[]} tagName="h2" className={`headline--white headline--centre headline--h2 headline--uppercase headline--margin-b}`} value={props.attributes.text} onChange={handleTextChange} />
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
