import { registerBlockType } from "@wordpress/blocks"
import { CheckboxControl } from "@wordpress/components"
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor"
import { useSelect } from "@wordpress/data"
import { store as coreStore } from "@wordpress/core-data"
import { SelectControl } from "@wordpress/components"

registerBlockType("blocktheme/casestudychooser", {
  title: "OS -  Case Study",
  parent: ["blocktheme/casestudygroup"],
  supports: {
    align: ["full"]
  },
  attributes: {
    title: { type: "string" },
    postID: { type: "string", default: "0" },
    csLayoutType: { type: "string", default: "list" }
  },
  usesContext: ["blocktheme/csLayoutType"],

  edit: EditComponent,
  save: SaveComponent,
  apiVersion: 2
})

function EditComponent(props) {
  props.setAttributes({ csLayoutType: props.context["blocktheme/csLayoutType"] })

  const blockProps = useBlockProps({ className: "case-studies__study content-area" })
  const innerBlocksProps = useInnerBlocksProps({}, { allowedBlocks: ["blocktheme/casestudy"] })
  const { caseStudy } = props

  const caseStudies = useSelect(select => select(coreStore).getEntityRecords("postType", "case-studies"), [])
  var caseStudyOptions = !Array.isArray(caseStudies)
    ? caseStudies
    : caseStudies.map(
        // Format the options for display in the <SelectControl/>
        caseStudy => ({
          label: caseStudy.title.rendered,
          value: caseStudy.id
        })
      )
  function handleCaseStudyChange(x) {
    props.setAttributes({ postID: x })
    props.setAttributes({ title: caseStudies.filter(cs => cs.id == x)[0].title.raw })
  }
  {
    caseStudies && caseStudyOptions.splice(0, 0, { value: "", label: "-- Choose a case study --", selected: true })
  }
  return (
    <>
      <div {...blockProps}>
        <div class="case-studies__details">
          {caseStudies && <SelectControl label="Select a Case Study" value={props.attributes.postID} options={caseStudyOptions} onChange={handleCaseStudyChange} />}
          <h3 class="case-studies__title">{props.attributes.title}</h3>
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
