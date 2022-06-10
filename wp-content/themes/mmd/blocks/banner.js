import { RichText } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType("blocktheme/banner", {
  title: "OS -  Banner",
  attributes: {
    text: { type: "string" },
    logoURL: { type: "string", default: banner.logoURL }
  },
  edit: EditComponent,
  save: SaveComponent
})

function EditComponent(props) {
  function handleTextChange(x) {
    props.setAttributes({ text: x })
  }

  return (
    <>
      <div class="page-header">
        <div class="page-header__content">
          <div class="wrapper wrapper--grid">
            <div class="page-header__logo">
              <img src={props.attributes.logoURL} alt="Oriel Square Logo" />
            </div>
            <div class="page-header__text">
              <RichText allowedFormats={["core/bold", "core/italic"]} tagName="h1" className={`headline headline--h1`} placeholder="Page title" value={props.attributes.text} onChange={handleTextChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function SaveComponent(props) {
  return <RichText.Content tagName="h1" value={props.attributes.text} className={`headline headline--h1`} />
}
