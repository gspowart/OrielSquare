import { registerBlockType } from "@wordpress/blocks"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { TextControl, PanelBody, PanelRow } from "@wordpress/components"
import { InspectorControls } from "@wordpress/block-editor"

registerBlockType("blocktheme/header", {
  title: "OS -  Header",
  attributes: {
    themeURL: { type: "string", default: header.themeURL },
    facebookURL: { type: "string", default: "#" },
    linkedInURL: { type: "string", default: "#" },
    twitterURL: { type: "string", default: "#" }
  },
  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  const blockProps = useBlockProps({ className: `` })
  const innerBlocksProps = useInnerBlocksProps(blockProps, { allowedBlocks: ["core/navigation"] })
  return (
    <>
      <InspectorControls>
        <PanelBody title="Social Links" initialOpen={true}>
          <PanelRow>
            <TextControl label="Facebook URL" onChange={value => props.setAttributes({ facebookURL: value })} />
          </PanelRow>
          <PanelRow>
            <TextControl label="Twitter URL" onChange={value => props.setAttributes({ twitterURL: value })} />
          </PanelRow>
          <PanelRow>
            <TextControl label="LinkedIn URL" onChange={value => props.setAttributes({ linkedInURL: value })} />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <header class="site-header site-header--moves">
        <div class="wrapper">
          <div class="site-header__menu-icon">
            <div class="site-header__menu-icon__middle"></div>
          </div>
          <div class="site-header__menu-content site-header__menu-content--fixed">
            <nav class="primary-nav">
              <ul>
                <li>
                  <a class="active" href="#">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Services</a>
                  <ul>
                    <li>
                      <a href="#">Strategy</a>
                    </li>
                    <li>
                      <a href="#">Research</a>
                    </li>
                    <li>
                      <a href="#">Publishing</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Case Studies</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Job Opportunities</a>
                </li>
              </ul>
            </nav>
            <div class="site-header__social-links">
              <a href={`${props.attributes.linkedInURL}`} class="social-link">
                <img src={`${props.attributes.themeURL}/icons/LinkedIn.svg`} alt="LinkedIn" />
              </a>
              <a href={`${props.attributes.twitterURL}`} class="social-link">
                <img src={`${props.attributes.themeURL}/icons/Twitter.svg`} alt="Twitter" />
              </a>
              <a href={`${props.attributes.facebookURL}`} class="social-link">
                <img src={`${props.attributes.themeURL}/icons/Facebook.svg`} alt="Facebook" />
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
function SaveComponent(props) {
  const blockProps = useBlockProps.save({})
  const innerBlocksProps = useInnerBlocksProps.save(blockProps)

  return <>{innerBlocksProps.children}</>
}
