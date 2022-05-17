import { registerBlockType } from "@wordpress/blocks"
import { Button, SelectControl, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import { InspectorControls, useBlockProps, useInnerBlocksProps, MediaUpload, MediaUploadCheck, getColorObjectByColorValue } from "@wordpress/block-editor"
import { useEffect } from "@wordpress/element"
import { createBlock } from "@wordpress/blocks"
import { dispatch } from "@wordpress/data"
import apiFetch from "@wordpress/api-fetch"

registerBlockType("blocktheme/columncontent", {
  title: "OS -  Content Area",
  supports: {
    align: ["full"]
  },
  attributes: {
    className: { type: "string" },
    margin: { type: "string", default: "none" },
    alignment: { type: "string", default: "none" },
    backgroundImage: { type: "string", default: "" },
    foregroundContent: { type: "string", default: "" },
    backgroundColor: { type: "string", default: "none" },
    imgID: { type: "number" },
    imgURL: { type: "string", default: columncontent.fallbackImage },
    imgURLx2: { type: "string", default: columncontent.fallbackImage },
    imgAlt: { type: "string", default: "#" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const DEFAULT_TEMPLATE = [["core/paragraph"]]
  const blockProps = useBlockProps({ className: `${props.attributes.className} content-area ${props.attributes.backgroundColor} ${props.attributes.backgroundImage} ${props.attributes.alignment} ${props.attributes.margin}` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { template: DEFAULT_TEMPLATE })

  const backgroundColors = [
    { name: "none", color: "#ffffff", colorClass: "" },
    { name: "shaded", color: "transparent", colorClass: "content-area--transparent" }
  ]
  var currentColorValue = ""
  let currentColor = backgroundColors.filter(color => {
    return color.colorClass == props.attributes.colorClass
  })
  if (currentColor && currentColor.length) {
    currentColorValue = currentColor[0].color
  }

  function handleColorChange(colorCode) {
    const { colorClass } = getColorObjectByColorValue(backgroundColors, colorCode)
    props.setAttributes({ backgroundColor: colorClass })
  }
  useEffect(
    function () {
      console.log("Load Image" + props.clientId)
      if (props.attributes.imgID) {
        async function go() {
          const response = await apiFetch({
            path: `/wp/v2/media/${props.attributes.imgID}`,
            method: "GET"
          })

          var imageUrl = response.media_details.sizes.full.source_url
          var imageUrlx2 = response.media_details.sizes.full.source_url
          if (response.media_details.sizes.backgroundImage) {
            imageUrl = response.media_details.sizes.backgroundImage.source_url
          }
          if (response.media_details.sizes.backgroundImage_2x) {
            imageUrlx2 = response.media_details.sizes.backgroundImage_2x.source_url
          }
          props.setAttributes({ imgURL: imageUrl, imgURLx2: imageUrlx2, imgAlt: response.alt_text })
          props.setAttributes({ backgroundImage: "content-area--background" })
          props.setAttributes({ foregroundContent: "content-area__foreground-content" })
        }
        go()
      }
    },
    [props.attributes.imgID]
  )

  function onFileSelect(x) {
    if (props.attributes.imgID != -1) {
      /*const block = createBlock("blocktheme/heading")
      block.attributes.size = "h2"
      block.attributes.text = "Hello"
      dispatch("core/block-editor").insertBlock(block, 0, props.clientId)

      console.log(block)
      console.log(props)*/
    }
    props.setAttributes({ imgID: x.id })
  }

  function handleMarginChange(marginSize) {
    props.setAttributes({ margin: marginSize })
  }
  function handleAlignmentChange(alignChoice) {
    props.setAttributes({ alignment: alignChoice })
  }
  function handlePaddingChange(paddingChoice) {
    props.setAttributes({ foregroundContent: paddingChoice })
  }
  function removeImage() {
    props.setAttributes({ imgID: "", backgroundImage: "", imgURL: "", imgURLx2: "", imgAlt: "", foregroundContent: "" })
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Background Image" initialOpen={true}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onFileSelect}
              value={props.attributes.imgID}
              render={({ open }) => {
                return <Button onClick={open}>Choose Image</Button>
              }}
            />
          </MediaUploadCheck>
          <Button onClick={removeImage}>Remove Image</Button>
        </PanelBody>
        <PanelBody title="Background Colour" initialOpen={true}>
          <PanelRow>
            <ColorPalette disableCustomColors={true} clearable={false} colors={backgroundColors} value={currentColorValue} onChange={handleColorChange} />
          </PanelRow>
        </PanelBody>
        <PanelBody title="Content Formatting" initialOpen={true}>
          <PanelRow>
            <SelectControl
              label="Bottom Margin"
              value={props.attributes.margin}
              options={[
                { value: "", label: "None" },
                { value: "b-margin", label: "Standard" }
              ]}
              onChange={handleMarginChange}
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Content Padding"
              value={props.attributes.foregroundContent}
              options={[
                { value: "", label: "None" },
                { value: "content-area__foreground-content", label: "Edge padding" }
              ]}
              onChange={handlePaddingChange}
            />
          </PanelRow>
          <PanelRow>
            <SelectControl
              label="Alignment"
              value={props.attributes.alignment}
              options={[
                { value: "", label: "Left" },
                { value: "content-area--centre", label: "Centre" },
                { value: "strapline", label: "Strapline" }
              ]}
              onChange={handleAlignmentChange}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps}>
        {props.attributes.imgID && (
          <picture class="content-area__background-image">
            <source srcset={`${props.attributes.imgURL}`} media="(min-width: 1380px)" />
            <img srcset={`${props.attributes.imgURL} 1172w, ${props.attributes.imgURLx2} 2344w`} alt={`${props.attributes.imgAlt}`} />
          </picture>
        )}
        <div class={`${props.attributes.foregroundContent}`}>{innerBlocksProps.children}</div>
      </div>
    </>
  )
}

function SaveComponent() {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
