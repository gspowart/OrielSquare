import pageColors from "../../inc/pageColors"
import { SelectControl, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import { InspectorControls, getColorObjectByColorValue } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/columns", {
  title: "OS -  Columns",
  supports: {
    align: ["full"]
  },
  attributes: {
    width: { type: "string", default: "wrapper wrapper--large" },
    padding: { type: "string", default: "medium" },
    backgroundColor: { type: "string", default: "white" },
    columnClass: {
      type: "string"
    }
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

  function handleRowSizeChange(rowWidth) {
    props.setAttributes({ width: rowWidth })
  }

  function handlePaddingChange(rowPadding) {
    props.setAttributes({ padding: rowPadding })
  }

  const blockProps = useBlockProps({ className: `${props.attributes.width}` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/columns-4060", "blocktheme/columns-5050", "blocktheme/columncontent", "blocktheme/imagerow"] })
  return (
    <>
      <InspectorControls>
        <PanelBody title="Background Colour" initialOpen={true}>
          <PanelRow>
            <ColorPalette disableCustomColors={true} clearable={false} colors={pageColors} value={currentColorValue} onChange={handleColorChange} />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Row Padding" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Padding"
              value={props.attributes.padding}
              options={[
                { value: "page-section--no-padding", label: "None" },
                { value: "", label: "Default" },
                { value: "page-section--padding-small", label: "Small" },
                { value: "page-section--padding-medium", label: "Medium" },
                { value: "page-section--padding-large", label: "Large" }
              ]}
              onChange={handlePaddingChange}
            />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Row Width" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Width"
              value={props.attributes.width}
              options={[
                { value: "wrapper wrapper--small", label: "Small" },
                { value: "wrapper wrapper--narrow", label: "Narrow" },
                { value: "wrapper wrapper--mid", label: "Mid" },
                { value: "wrapper wrapper--large", label: "Large" },
                { value: "", label: "Full" }
              ]}
              onChange={handleRowSizeChange}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className={`page-section page-section--${props.attributes.backgroundColor} ${props.attributes.padding}`}>
        <div {...innerBlocksProps} />
      </div>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
