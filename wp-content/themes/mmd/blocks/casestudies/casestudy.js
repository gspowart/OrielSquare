import apiFetch from "@wordpress/api-fetch"
import { registerBlockType } from "@wordpress/blocks"
import { Button, SelectControl, PanelBody, PanelRow } from "@wordpress/components"
import { RichText, InspectorControls, useBlockProps, useInnerBlocksProps, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"

registerBlockType("blocktheme/casestudy", {
  title: "OS -  Case Study",
  supports: {
    align: ["full"]
  },
  attributes: {
    title: { type: "string" },
    type: { type: "string" },
    imgID: { type: "number" },
    imgURL: { type: "string", default: casestudy.defaultImage },
    imgURLx2: { type: "string", default: casestudy.defaultImage },
    imgAlt: { type: "string", default: "Image" },
    extract: { type: "string" },
    featured: { type: "boolean" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const CASESTUDY_TEMPLATE = [
    ["core/paragraph", { placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }],
    ["blocktheme/button", { text: "Find out more" }]
  ]

  const blockProps = useBlockProps({})
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template: CASESTUDY_TEMPLATE })
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
          if (response.media_details.sizes.caseStudyImage) {
            imageUrl = response.media_details.sizes.caseStudyImage.source_url
          }
          if (response.media_details.sizes.caseStudyImage_2x) {
            imageUrlx2 = response.media_details.sizes.caseStudyImage_2x.source_url
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
      <div {...blockProps}>
        <div className="row row--gutters">
          <div class="row__large-6 row--center-content-vertically content-area">
            <RichText tagName="p" className="headline headline--h4 headline--blue headline--uppercase headline--margin-b-mid" allowedFormats={["core/bold", "core/italic"]} placeholder="Case Study Category" value={props.attributes.type} onChange={value => props.setAttributes({ type: value })} />
            <RichText tagName="h3" className="headline headline--h3 headline--underline" allowedFormats={["core/bold", "core/italic"]} placeholder="Case Study Title" value={props.attributes.title} onChange={value => props.setAttributes({ title: value })} />
            <div {...innerBlocksProps} />
          </div>
          <div class="row__large-6 row--center-content">
            <img srcset={`${props.attributes.imgURL} 1x, ${props.attributes.imgURLx2} 2x`} alt={`${props.attributes.imgAlt}`} />
          </div>
        </div>
      </div>
      <div class="case-studies__excerpt-editor">
        <h2 class="headline headline--h2">Excerpt Text</h2>
        <RichText tagName="p" allowedFormats={["core/bold", "core/italic"]} placeholder="This will be displayed on the case study index page and on the homepage slider etc" value={props.attributes.extract} onChange={value => props.setAttributes({ extract: value })} />
      </div>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
