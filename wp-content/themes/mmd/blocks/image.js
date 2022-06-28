import apiFetch from "@wordpress/api-fetch"
import { ToolbarGroup, ToolbarButton, Button, PanelBody, Popover } from "@wordpress/components"
import { InspectorControls, BlockControls, MediaUpload, MediaUploadCheck, useBlockProps, useInnerBlocksProps, __experimentalLinkControl as LinkControl } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { useEffect } from "@wordpress/element"
import { link } from "@wordpress/icons"
import { useState } from "@wordpress/element"

registerBlockType("blocktheme/image", {
  title: "OS -  Image",
  parent: ["blocktheme/imagerow"],
  attributes: {
    imgID: { type: "number" },
    imgURL: { type: "string", default: image.fallbackImage },
    imgURLx2: { type: "string", default: image.fallbackImage },
    imgAlt: { type: "string", default: "Image" },
    imgSize: { type: "string", default: "logo" },
    class: { type: "string", default: "image-flexbox__image image-flexbox__image--grey" },
    layout: { type: "string", default: "" },
    linkObject: { type: "object", default: { url: "" } }
  },
  usesContext: ["blocktheme/layout"],
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)
  const toggleVisible = () => {
    setIsLinkPickerVisible(state => !state)
  }
  const blockProps = useBlockProps({})
  const innerBlocksProps = useInnerBlocksProps(blockProps, {})
  props.setAttributes({ layout: props.context["blocktheme/layout"] })

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
          if (response.media_details.sizes.logo_1x) {
            imageUrl = response.media_details.sizes.logo_1x.source_url
          }
          if (response.media_details.sizes.logo_2x) {
            imageUrlx2 = response.media_details.sizes.logo_2x.source_url
          }
          props.setAttributes({ imgURL: imageUrl, imgURLx2: imageUrlx2, imgAlt: response.alt_text })
        }
        go()
      }
    },
    [props.attributes.imgID]
  )

  function buttonHandler() {
    setIsLinkPickerVisible(prev => !prev)
  }

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink })
  }

  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id })
  }

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={toggleVisible} icon={link} />
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        <PanelBody title="Image" initialOpen={true}>
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
        <img class={`${props.attributes.class}`} srcset={`${props.attributes.imgURL} 1x, ${props.attributes.imgURLx2} 2x`} alt={`${props.attributes.imgAlt}`} />
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
  return null
}
