import { registerBlockType } from "@wordpress/blocks"
import { RichText, useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"

registerBlockType("blocktheme/testimonials", {
  title: "OS -  Testimonials",
  supports: {
    align: ["full"]
  },
  attributes: {
    title: { type: "string", default: "WHAT OUR CLIENTS LIKE ABOUT US" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const blockProps = useBlockProps({ className: `page-section page-section--aqua page-section--padding-medium` })
  const innerBlocksProps = useInnerBlocksProps({ className: `glide__slide` }, { allowedBlocks: ["blocktheme/testimonial"] })
  function handleTextChange(x) {
    props.setAttributes({ title: x })
  }
  return (
    <>
      <div {...blockProps}>
        <div class="wrapper wrapper--narrow">
          <RichText tagName="h2" placeholder="Page title" value={props.attributes.title} className="headline headline--white headline--centre headline--h2 headline--uppercase" onChange={handleTextChange} />
          <div class="glide glide-testimonial">
            <div class="glide__track" data-glide-el="track">
              <div class="glide__slides glide__slides--editor">
                <div {...innerBlocksProps} />
              </div>
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
