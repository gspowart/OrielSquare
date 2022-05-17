import "../styles/styles.css"
import "../../../node_modules/@glidejs/glide/dist/css/glide.core.css"
import Modal from "./modules/Modal"
import MobileMenu from "./modules/MobileMenu"
import Glide from "@glidejs/glide"

let mobileMenu = new MobileMenu()
let modal = new Modal()

document.querySelectorAll(".has-submenu").forEach(el => {
  el.addEventListener("click", e => {
    if (!el.classList.contains("is-showing-submenu")) {
      e.preventDefault()
      el.classList.toggle("is-showing-submenu")
    }
  })
})

document.querySelectorAll(".open-modal").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault()
    modal.openTheModal()
  })
})

function makeCarousel(selector) {
  var carouselItems = document.querySelector(selector)
  var carousel
  if (carouselItems) {
    var transitionSpeed = carouselItems.dataset.transitionSpeed
    if (transitionSpeed < 0) transitionSpeed = false
    carousel = new Glide(selector, {
      type: "carousel",
      startAt: 0,
      perView: 1,
      autoplay: transitionSpeed,
      animationDuration: 900
    })
    // Automated height on Carousel build
    carousel.on("build.after", function () {
      glideHandleHeight(selector)
    })

    // Automated height on Carousel change
    carousel.on("run.after", function () {
      glideHandleHeight(selector)
    })
    carousel.mount()
  }
  return carousel
}

// Move the content into the bottom on the HTML
// Update the ID numbers
// Make the carousel
// Set the click events
var popupContentTeam = document.querySelector("#popupcontent")
var teamBioCount = 0
document.querySelectorAll(".showTeamBio").forEach(el => {
  el.dataset.teamId = teamBioCount
  teamBioCount++
  popupContentTeam.append(el.parentElement.querySelector(".team__profile--popup-content"))
})
var carouselTeam = makeCarousel(".glide-team")

document.querySelectorAll(".showTeamBio").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault()
    setModalItem(carouselTeam, el.dataset.teamId)
  })
})

var popupContentCS = document.querySelector("#popupcontentCS")
var caseStudiesPopupCount = 0
document.querySelectorAll(".showCaseStudy").forEach(el => {
  el.dataset.caseStudyId = caseStudiesPopupCount
  caseStudiesPopupCount++
  popupContentCS.append(el.parentElement.querySelector(".case-studies__details--popup-content"))
})
var carouselCS = makeCarousel(".glide-case-studies")

document.querySelectorAll(".showCaseStudy").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault()
    setModalItem(carouselCS, el.dataset.caseStudyId)
  })
})

var carouselText = makeCarousel(".glide-testimonial")

function setModalItem(carousel, id) {
  carousel.update({ startAt: id })
}

var index = Math.floor(Math.random() * document.querySelectorAll(".page-header__image").length)
document
  .querySelectorAll(".page-header__image")
  [index].querySelectorAll("source, img")
  .forEach(el => {
    el.setAttribute("srcset", el.getAttribute("data-srcset"))
  })

// Resize height
function glideHandleHeight(selector) {
  const activeSlide = document.querySelector(selector + " .glide__slide--active")
  const activeSlideHeight = activeSlide ? activeSlide.offsetHeight : 0

  const glideTrack = document.querySelector(selector + " .glide__track")
  const glideTrackHeight = glideTrack ? glideTrack.offsetHeight : 0

  if (activeSlideHeight !== glideTrackHeight) {
    glideTrack.style.height = `${activeSlideHeight}px`
  }
}
