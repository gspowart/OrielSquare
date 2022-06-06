import apiFetch from "@wordpress/api-fetch"
import { registerBlockType } from "@wordpress/blocks"
import { Button, PanelBody } from "@wordpress/components"
import { useBlockProps, useInnerBlocksProps, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"

registerBlockType("blocktheme/genericimage", {
  title: "OS -  Generic Image",
  supports: {
    align: ["full"]
  },
  attributes: {
    wrapperClassName: { type: "string", default: "" },
    wrapperTag: { type: "string", default: "div" },
    imgID: { type: "number" },
    imgURL: { type: "string", default: genericimage.fallbackImage },
    imgURLx2: { type: "string", default: genericimage.fallbackImage },
    imgAlt: { type: "string", default: "Image" },
    imgSize: { type: "string", default: "logo" },
    class: { type: "string", default: "" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const blockProps = useBlockProps({ className: props.attributes.wrapperClassName })
  const innerBlocksProps = useInnerBlocksProps(blockProps, {})
  const TagWrapper = props.attributes.wrapperTag
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

  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id })
  }
  function removeImage() {
    props.setAttributes({ imgID: "", backgroundImage: "", imgURL: "", imgURLx2: "", imgAlt: "" })
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Image" initialOpen={true}>
          <MediaUploadCheck>
            {props.attributes.imgURL != "" && (
              <p>
                Current Image
                <br />
                <img src={props.attributes.imgURL} />
              </p>
            )}
            <MediaUpload
              onSelect={onFileSelect}
              value={props.attributes.imgID}
              render={({ open }) => {
                return <Button onClick={open}>Choose Image</Button>
              }}
            />

            <Button onClick={removeImage}>Remove Image</Button>
          </MediaUploadCheck>
        </PanelBody>
      </InspectorControls>
      <TagWrapper {...blockProps}>
        <img width="140" class={`${props.attributes.class}`} srcset={`${props.attributes.imgURL} 1x, ${props.attributes.imgURLx2} 2x`} alt={`${props.attributes.imgAlt}`} />
      </TagWrapper>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
