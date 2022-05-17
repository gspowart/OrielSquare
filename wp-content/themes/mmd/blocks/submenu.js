import { SelectControl, PanelBody, PanelRow, ToolbarGroup, ToolbarButton } from "@wordpress/components"
import { RichText, BlockControls, InspectorControls } from "@wordpress/block-editor"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType("blocktheme/submenu", {
  title: "OS -  Sub Menu",
  attributes: {
    menuTitle: { type: "string", default: "" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const blockProps = useBlockProps({
    tagName: "li",
    className: `page-sub-menu__title`,
    value: props.attributes.menuTitle,
    placeholder: "Heading Text"
  })
  const innerBlocksProps = useInnerBlocksProps(blockProps, {})

  function handleTextChange(x) {
    props.setAttributes({ menuTitle: x })
  }

  return (
    <>
      <ul class="page-sub-menu">
        <RichText {...blockProps} onChange={handleTextChange} />
        <li class="page-sub-menu__link">
          <a class="active" href="#">
            Links will be automatically generated
          </a>
        </li>
      </ul>
    </>
  )
}

function SaveComponent(props) {
  return null
}
