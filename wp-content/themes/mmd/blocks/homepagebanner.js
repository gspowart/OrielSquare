import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/homepagebanner", {
  title: "OS -  Homepage Banners",
  attributes: {
    logoURL: { type: "string", default: homepagebanner.logoURL },
    pictureClass: { type: "string", default: "page-header__image" },
    pictureSize: { type: "string", default: "homepage_banner_1x" },
    pictureSize2x: { type: "string", default: "homepage_banner_2x" }
  },
  providesContext: { "blocktheme/pictureClass": "pictureClass", "blocktheme/pictureSize": "pictureSize", "blocktheme/pictureSize2x": "pictureSize2x" },

  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const blockProps = useBlockProps({ className: `page-header page-header--homepage page-header--no-padding page-header--white` })
  const innerBlocksProps = useInnerBlocksProps({ className: `page-header__image--editor-images` }, { allowedBlocks: ["blocktheme/genericpicture"], template: [["blocktheme/genericpicture", { class: props.attributes.pictureClass }]] })

  return (
    <>
      <div {...blockProps}>
        <div class="page-header__image page-header__image--editor">
          <p class="page-header__image--editor-title headline headline--h3">Chosen images</p>
          <div {...innerBlocksProps} />
        </div>
        <div class="page-header__content page-header__content--home">
          <div class="wrapper">
            <div class="page-header__logo page-header__logo--home">
              <img src={props.attributes.logoURL} alt="Oriel Square Logo" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return innerBlocksProps.children
}
