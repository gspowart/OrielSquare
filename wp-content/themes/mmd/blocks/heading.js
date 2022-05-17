import { SelectControl, PanelBody, PanelRow, ToolbarGroup, ToolbarButton, ColorPalette } from "@wordpress/components"
import { RichText, BlockControls, InspectorControls, getColorObjectByColorValue } from "@wordpress/block-editor"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType("blocktheme/heading", {
  title: "OS -  Heading",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "h1" },
    tagName: { type: "string", default: "h1" },
    placeholder: { type: "string", default: "Heading Text" },
    classes: { type: "string", default: "" },
    uppercase: { type: "string", default: "" },
    margin: { type: "string", default: "none" },
    textColor: { type: "string", default: "" },
    underline: { type: "string", default: "" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const pageColors = [
    { name: "default", color: "#1f2e2e", colorClass: "" },
    { name: "white", color: "#ffffff", colorClass: "headline--white" },
    { name: "blue", color: "#0092b6", colorClass: "headline--blue" }
  ]

  var currentColorValue = ""
  let currentColor = pageColors.filter(color => {
    return color.colorClass == props.attributes.colorClass
  })
  if (currentColor && currentColor.length) {
    currentColorValue = currentColor[0].color
  }

  function handleColorChange(colorCode) {
    const { colorClass } = getColorObjectByColorValue(pageColors, colorCode)
    props.setAttributes({ textColor: colorClass })
  }
  function handleTextChange(x) {
    props.setAttributes({ text: x })
  }
  function handleMarginChange(marginSize) {
    props.setAttributes({ margin: marginSize })
  }
  const blockProps = useBlockProps({
    allowedFormats: ["core/bold", "core/italic"],
    tagName: props.attributes.tagName,
    placeholder: props.attributes.placeholder,
    className: `headline headline--${props.attributes.size} ${props.attributes.classes} ${props.attributes.uppercase} ${props.attributes.margin} ${props.attributes.textColor} ${props.attributes.underline}`,
    value: props.attributes.text
  })

  const innerBlocksProps = useInnerBlocksProps(blockProps, {})

  return (
    <>
      <InspectorControls>
        <PanelBody title="Content Formatting" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Bottom Margin"
              value={props.attributes.margin}
              options={[
                { value: "", label: "None" },
                { value: "headline--margin-b-sm", label: "Small" },
                { value: "headline--margin-b-mid", label: "Mid" },
                { value: "headline--margin-b", label: "Standard" }
              ]}
              onChange={handleMarginChange}
            />
          </PanelRow>
          <PanelBody title="Text Colour" initialOpen={true}>
            <PanelRow>
              <ColorPalette disableCustomColors={true} clearable={false} colors={pageColors} value={currentColorValue} onChange={handleColorChange} />
            </PanelRow>
          </PanelBody>
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton isPressed={props.attributes.size === "h1"} onClick={() => props.setAttributes({ size: "h1" })}>
            Large
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.size === "h2"} onClick={() => props.setAttributes({ size: "h2" })}>
            Medium
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.size === "h3"} onClick={() => props.setAttributes({ size: "h3" })}>
            Small
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.tagName === "h1"} onClick={() => props.setAttributes({ tagName: "h1" })}>
            H1
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.tagName === "h2"} onClick={() => props.setAttributes({ tagName: "h2" })}>
            H2
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.tagName === "h3"} onClick={() => props.setAttributes({ tagName: "h3" })}>
            H3
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.uppercase === "headline--uppercase"} onClick={() => (props.attributes.uppercase === "headline--uppercase" ? props.setAttributes({ uppercase: "" }) : props.setAttributes({ uppercase: "headline--uppercase" }))}>
            Uppercase
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.underline === "headline--underline"} onClick={() => (props.attributes.underline === "headline--underline" ? props.setAttributes({ underline: "" }) : props.setAttributes({ underline: "headline--underline" }))}>
            Underline
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      <RichText {...blockProps} onChange={handleTextChange} />
    </>
  )
}

function SaveComponent(props) {
  return null
}
