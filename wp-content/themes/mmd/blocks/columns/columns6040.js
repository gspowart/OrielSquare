import { registerBlockType } from "@wordpress/blocks"
import { SelectControl, PanelBody, PanelRow } from "@wordpress/components"
import { InspectorControls, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/columns6040", {
  title: "OS -  Columns (60/40)",
  parent: ["blocktheme/columns"],
  supports: {
    align: ["full"]
  },
  attributes: {
    gutters: { type: "string", default: "" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  function handleGutterSizeChange(gutterSize) {
    props.setAttributes({ gutters: gutterSize })
  }

  const MY_TEMPLATE = [
    ["core/group", { className: "row__medium-8" }],
    ["core/group", { className: "row__medium-4" }]
  ]

  const blockProps = useBlockProps({ className: `row ${props.attributes.gutters}` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template: MY_TEMPLATE })
  return (
    <>
      <InspectorControls>
        <PanelBody title="Cell Gutters" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Size"
              value={props.attributes.gutters}
              options={[
                { value: "", label: "None" },
                { value: "row--gutters-small", label: "Small" },
                { value: "row--gutters", label: "Normal" },
                { value: "row--gutters-large", label: "Large" }
              ]}
              onChange={handleGutterSizeChange}
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
