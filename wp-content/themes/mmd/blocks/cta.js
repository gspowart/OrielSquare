import { registerBlockType } from "@wordpress/blocks"
import { RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

import { SelectControl, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import { InspectorControls, getColorObjectByColorValue } from "@wordpress/block-editor"

registerBlockType("blocktheme/cta", {
  title: "OS -  Call to Action Block",
  supports: {
    align: ["full"]
  },
  attributes: {
    title: { type: "string" },
    placeholder: { type: "string", default: "Call To Action Title" },
    content: { type: "string" },
    backgroundColor: { type: "string", default: "transparent" },
    headlineColor: { type: "string", default: "headline--white" },
    layout: { type: "string", default: "" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const ctaColors = [
    { name: "transparent", color: "transparent" },
    { name: "white", color: "#ffffff" }
  ]

  const currentColorValue = ctaColors.filter(color => {
    return color.name == props.attributes.backgroundColor
  })[0].color

  function handleColorChange(colorCode) {
    const { name } = getColorObjectByColorValue(ctaColors, colorCode)
    props.setAttributes({ backgroundColor: name })
    if (name == "white") {
      props.setAttributes({ headlineColor: "" })
    } else {
      props.setAttributes({ headlineColor: "headline--white" })
    }
  }

  function handleLayoutChange(layoutStyle) {
    props.setAttributes({ layout: layoutStyle })
  }

  const blockProps = useBlockProps({ className: `cta__buttons` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/button"] })
  return (
    <>
      <InspectorControls>
        <PanelBody title="Background Colour" initialOpen={true}>
          <PanelRow>
            <ColorPalette disableCustomColors={true} clearable={false} colors={ctaColors} value={currentColorValue} onChange={handleColorChange} />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Layout" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Layout"
              value={props.attributes.layout}
              options={[
                { value: "", label: "Columns" },
                { value: "cta--rows", label: "Rows" }
              ]}
              onChange={handleLayoutChange}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className={`cta cta--${props.attributes.backgroundColor} ${props.attributes.layout}`}>
        <div className="cta__content">
          <RichText allowedFormats={[]} tagName="h2" className={`headline headline--h2 ${props.attributes.headlineColor} headline--margin-b-sm`} value={props.attributes.title} placeholder={props.attributes.placeholder} onChange={value => props.setAttributes({ title: value })} />
          <RichText allowedFormats={[]} tagName="p" className="" placeholder="Paragraph content" value={props.attributes.content} onChange={value => props.setAttributes({ content: value })} />
        </div>
        <div {...blockProps}>{innerBlocksProps.children}</div>
      </div>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return <>{innerBlocksProps.children}</>
}
