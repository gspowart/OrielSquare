import apiFetch from "@wordpress/api-fetch"
import { ToolbarGroup, ToolbarButton, Popover, Button, PanelBody } from "@wordpress/components"
import { InspectorControls, BlockControls, MediaUpload, MediaUploadCheck, __experimentalLinkControl as LinkControl } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { useState, useEffect } from "@wordpress/element"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { link } from "@wordpress/icons"

registerBlockType("blocktheme/cardimage", {
  title: "OS -  Card Image",
  parent: ["blocktheme/card"],
  supports: {
    align: ["full"]
  },
  attributes: {
    imgID: { type: "number" },
    imgURL: { type: "string", default: cardimage.fallbackImage },
    imgURLx2: { type: "string", default: cardimage.fallbackImage },
    imgAlt: { type: "string", default: "#" },
    linkObject: { type: "object", default: { url: "" } }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)
  const toggleVisible = () => {
    setIsLinkPickerVisible(state => !state)
  }

  useEffect(
    function () {
      if (props.attributes.imgID) {
        async function go() {
          const response = await apiFetch({
            path: `/wp/v2/media/${props.attributes.imgID}`,
            method: "GET"
          })
          var imageUrl = response.media_details.sizes.full.source_url
          var imageUrlx2 = response.media_details.sizes.full.source_url
          if (response.media_details.sizes.card_image_1x) {
            imageUrl = response.media_details.sizes.card_image_1x.source_url
          }
          if (response.media_details.sizes.card_image_2x) {
            imageUrlx2 = response.media_details.sizes.card_image_2x.source_url
          }
          props.setAttributes({ imgURL: imageUrl, imgURLx2: imageUrlx2, imgAlt: response.alt_text })
        }
        go()
      }
    },
    [props.attributes.imgID]
  )

  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id })
  }

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink })
  }

  const MY_TEMPLATE = [
    ["blocktheme/cardimage", { placeholder: "Image" }],
    ["blocktheme/cardcontent", {}]
  ]
  const blockProps = useBlockProps({ className: `os-card__image` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template: MY_TEMPLATE })

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={toggleVisible} icon={link} />
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        <PanelBody title="Card Image" initialOpen={true}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onFileSelect}
              value={props.attributes.imgID}
              render={({ open }) => {
                return <Button onClick={open}>Choose Image</Button>
              }}
            />
          </MediaUploadCheck>
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps}>
        <img srcset={`${props.attributes.imgURL} 1x, ${props.attributes.imgURLx2} 2x`} alt={`${props.attributes.imgAlt}`} />
        {isLinkPickerVisible && (
          <Popover position="middle center" onFocusOutside={() => setIsLinkPickerVisible(false)}>
            <LinkControl settings={[]} value={props.attributes.linkObject} onChange={handleLinkChange} />
            <Button variant="primary" onClick={() => setIsLinkPickerVisible(false)} style={{ display: "block", width: "100%" }}>
              Confirm Link
            </Button>
          </Popover>
        )}
      </div>
    </>
  )
}

function SaveComponent() {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
