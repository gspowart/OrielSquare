import { registerBlockType } from "@wordpress/blocks"
import { SelectControl, PanelBody, PanelRow } from "@wordpress/components"
import { useBlockProps, useInnerBlocksProps, InspectorControls } from "@wordpress/block-editor"

registerBlockType("blocktheme/imagerow", {
  title: "OS -  Image Row",
  supports: {
    align: ["full"]
  },
  attributes: {
    layout: { type: "string", default: "" }
  },
  providesContext: { "blocktheme/layout": "layout" },

  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const blockProps = useBlockProps({ className: `image-flexbox ${props.attributes.layout}` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["blocktheme/image"] })

  function handleLayoutChange(x) {
    props.setAttributes({ layout: x })
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Content Formatting" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Layout"
              value={props.attributes.layout}
              options={[
                { value: "", label: "Full Width" },
                { value: "image-flexbox--centre", label: "Content Centred" },
                { value: "carousel", label: "Carousel" }
              ]}
              onChange={handleLayoutChange}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps} />
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
