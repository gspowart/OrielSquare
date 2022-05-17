import apiFetch from "@wordpress/api-fetch"
import { registerBlockType } from "@wordpress/blocks"
import { Button, PanelBody } from "@wordpress/components"
import { useBlockProps, useInnerBlocksProps, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"

registerBlockType("blocktheme/genericpicture", {
  title: "OS -  Picture",
  attributes: {
    imgURL: { type: "string", default: genericpicture.fallbackImage },
    imgURLx2: { type: "string", default: genericpicture.fallbackImage },
    imgAlt: { type: "string", default: "#" },
    imgID: { type: "string", default: "" },
    imgSize: { type: "string", default: "" },
    imgSize2x: { type: "string", default: "" },
    class: { type: "string", default: "" }
  },
  usesContext: ["blocktheme/pictureClass", "blocktheme/pictureSize", "blocktheme/pictureSize2x"],
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  props.setAttributes({ class: props.context["blocktheme/pictureClass"] })
  props.setAttributes({ imgSize: props.context["blocktheme/pictureSize"] })
  props.setAttributes({ imgSize2x: props.context["blocktheme/pictureSize2x"] })

  const blockProps = useBlockProps({})
  const innerBlocksProps = useInnerBlocksProps(blockProps, {})

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
          if (response.media_details.sizes[props.attributes.imgSize]) {
            imageUrl = response.media_details.sizes[props.attributes.imgSize].source_url
          }
          if (response.media_details.sizes[props.attributes.imgSize]) {
            imageUrlx2 = response.media_details.sizes[props.attributes.imgSize2x].source_url
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
      <div {...innerBlocksProps}>
        <img srcset={`${props.attributes.imgURL} 1x, ${props.attributes.imgURLx2} 2x`} alt={`${props.attributes.imgAlt}`} />
      </div>
    </>
  )
}

function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
