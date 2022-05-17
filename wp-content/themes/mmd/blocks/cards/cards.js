import pageColors from "../../inc/pageColors"
import { SelectControl, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import { InspectorControls, getColorObjectByColorValue } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/cards", {
  title: "OS -  Cards",
  supports: {
    align: ["full"]
  },
  attributes: {
    backgroundColor: { type: "string", default: "white" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const currentColorValue = pageColors.filter(color => {
    return color.name == props.attributes.backgroundColor
  })[0].color

  function handleColorChange(colorCode) {
    const { name } = getColorObjectByColorValue(pageColors, colorCode)
    props.setAttributes({ backgroundColor: name })
  }

  const blockProps = useBlockProps({ className: `page-section page-section--no-padding page-section--${props.attributes.backgroundColor}` })
  const innerBlocksProps = useInnerBlocksProps({ className: `row` }, { allowedBlocks: ["blocktheme/card", "blocktheme/cta"] })
  return (
    <>
      <InspectorControls>
        <PanelBody title="Background Colour" initialOpen={true}>
          <PanelRow>
            <ColorPalette disableCustomColors={true} clearable={false} colors={pageColors} value={currentColorValue} onChange={handleColorChange} />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div {...blockProps}>
        <div className={`wrapper wrapper--wrapper--no-padding-til-medium`}>
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
