import apiFetch from "@wordpress/api-fetch"
import { Button, PanelBody } from "@wordpress/components"
import { RichText, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { useEffect } from "@wordpress/element"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

// prettier-ignore
registerBlockType("blocktheme/teamdirector", {
  title: "OS -  Team Directors Block",
  supports: {
    align: ["full"]
  },
  parent: ["blocktheme/teamdirectors"],
  attributes: {
    imgID: { type: "number" },
    imgURL: { type: "string", default: teamdirector.fallbackImage },
    imgURLx2: { type: "string", default: teamdirector.fallbackImage },
    name: { type: "string", default: "Name" },
    position: { type: "string", default: "Position" },
    bio: { type: "string", default: "Biography" },
    linkedin: { type: "string", default: "<a>#linkedin</a>" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
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
          if (response.media_details.sizes.team_director_1x) {
            imageUrl = response.media_details.sizes.team_director_1x.source_url
          }
          if (response.media_details.sizes.team_director_2x) {
            imageUrlx2 = response.media_details.sizes.team_director_2x.source_url
          }
          props.setAttributes({ imgURL: imageUrl, imgURLx2: imageUrlx2 })
        }
        go()
      }
    },
    [props.attributes.imgID]
  )

  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id })
  }

  const blockProps = useBlockProps({ className: "team__profile" })
  const innerBlocksProps = useInnerBlocksProps(blockProps)
  return (
    <>
      <InspectorControls>
        <PanelBody title="Profile Photo" initialOpen={true}>
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
        <div class="team__photo">
          <img srcset={`${props.attributes.imgURL} 1x, ${props.attributes.imgURLx2} 2x`} alt="#" />
        </div>
        <div class="team__details content-area">
          <RichText allowedFormats={[]} tagName="div" className="team__name" value={props.attributes.name} onChange={value => props.setAttributes({ name: value })} />
          <RichText allowedFormats={[]} tagName="div" className="team__position" value={props.attributes.position} onChange={value => props.setAttributes({ position: value })} />
          <div class="team__contact">
            <span class="linkedin">
              <RichText allowedFormats={["core/bold", "core/italic", "core/link"]} tagName="span" className="linkedin-url" value={props.attributes.linkedin} onChange={value => props.setAttributes({ linkedin: value })} />
            </span>
          </div>
        </div>
        <RichText allowedFormats={["core/bold", "core/italic", "core/link"]} tagName="p" className="team__bio" value={props.attributes.bio} onChange={value => props.setAttributes({ bio: value })} />
      </div>
    </>
  )
}
function SaveComponent() {
  return <></>
}
