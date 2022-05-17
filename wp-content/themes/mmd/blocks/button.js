import brandColors from "../inc/brandColors"
import { ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import { useBlockProps, useInnerBlocksProps, RichText, InspectorControls, BlockControls, __experimentalLinkControl as LinkControl, getColorObjectByColorValue } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { link } from "@wordpress/icons"
import { useState } from "@wordpress/element"

registerBlockType("blocktheme/button", {
  title: "OS -  Button",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "normal" },
    linkObject: { type: "object", default: { url: "" } },
    colorName: { type: "string", default: "default" },
    placeholder: { type: "string", default: "Button Text" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)
  const blockProps = useBlockProps({})

  function handleTextChange(x) {
    props.setAttributes({ text: x })
  }

  function buttonHandler() {
    setIsLinkPickerVisible(prev => !prev)
  }

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink })
  }

  const currentColorValue = brandColors.filter(color => {
    return color.name == props.attributes.colorName
  })[0].color

  function handeColorChange(colorCode) {
    const { name } = getColorObjectByColorValue(brandColors, colorCode)
    props.setAttributes({ colorName: name })
  }

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={buttonHandler} icon={link} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton isPressed={props.attributes.size === "large"} onClick={() => (props.attributes.size === "large" ? props.setAttributes({ size: "default" }) : props.setAttributes({ size: "large" }))}>
            Large Button
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        <PanelBody title="Color" initialOpen={true}>
          <PanelRow>
            <ColorPalette disableCustomColors={true} clearable={false} colors={brandColors} value={currentColorValue} onChange={handeColorChange} />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <RichText {...blockProps} allowedFormats={[]} tagName="a" className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`} placeholder={props.attributes.placeholder} value={props.attributes.text} onChange={handleTextChange} />
      {isLinkPickerVisible && (
        <Popover position="middle center" onFocusOutside={() => setIsLinkPickerVisible(false)}>
          <LinkControl settings={[]} value={props.attributes.linkObject} onChange={handleLinkChange} />
          <Button {...blockProps} variant="primary" onClick={() => setIsLinkPickerVisible(false)} style={{ display: "block", width: "100%" }}>
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  )
}

function SaveComponent(props) {
  return null
}
