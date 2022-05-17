import { registerBlockType } from "@wordpress/blocks"
import { SelectControl, PanelBody, PanelRow } from "@wordpress/components"
import { InspectorControls } from "@wordpress/block-editor"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/card", {
  title: "OS -  Card",
  parent: ["blocktheme/cards"],
  supports: {
    align: ["full"]
  },
  attributes: {
    className: { type: "string" },
    colourTheme: { type: "string", default: "os-card--grey" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const MY_TEMPLATE = [
    ["blocktheme/cardimage", { placeholder: "Image" }],
    ["blocktheme/cardcontent", {}]
  ]
  const blockProps = useBlockProps({ className: `row__large-4 os-card ${props.attributes.colourTheme}` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template: MY_TEMPLATE })
  function handleColourChange(themeColour) {
    props.setAttributes({ colourTheme: themeColour })
  }
  return (
    <>
      <InspectorControls>
        <PanelBody title="Colour Theme" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Theme"
              value={props.attributes.colourTheme}
              options={[
                { value: "os-card--grey", label: "Grey" },
                { value: "os-card--white", label: "White" }
              ]}
              onChange={handleColourChange}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps} />
    </>
  )
}

function SaveComponent() {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
