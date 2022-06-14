import "../styles/styles.css"
import "../../../node_modules/@glidejs/glide/dist/css/glide.core.css"
import Modal from "./modules/Modal"
import MobileMenu from "./modules/MobileMenu"
import Glide from "@glidejs/glide"

let mobileMenu = new MobileMenu()
let modal = new Modal()

document.querySelectorAll(".menu-item-has-children").forEach(el => {
  el.addEventListener("click", e => {
    // Only do this if the mobile menu is displayed
    if (document.querySelector(".site-header__menu-content--is-visible")) {
      if (!el.classList.contains("is-showing-submenu")) {
        e.preventDefault()
        el.classList.toggle("is-showing-submenu")
      }
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
  if (carouselItems != null) {
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
  var popupContent = el.parentElement.querySelector(".case-studies__details--popup-content")
  if (popupContent) {
    popupContentCS.append(popupContent)
  }
})

var carouselCS = makeCarousel(".glide-case-studies")
document.querySelectorAll(".showCaseStudy").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault()
    setModalItem(carouselCS, el.dataset.caseStudyId)
  })
})

if (document.querySelector(".glide-logos")) {
  var glideLogos = new Glide(".glide-logos", {
    type: "carousel",
    perView: 5,
    autoplay: 2000,
    animationDuration: 900,
    breakpoints: {
      800: {
        perView: 3
      }
    }
  })
  glideLogos.mount()
}

var carouselText = makeCarousel(".glide-testimonial")

function setModalItem(carousel, id) {
  carousel.update({ startAt: id })
}

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

// Filter case studies
var csFilter = document.querySelector("#caseStudyFilter")
if (csFilter) {
  csFilter.addEventListener("change", e => {
    filterCaseStudy(e.target.value)
  })
}

// Check for querystring filter of case studies
const params = new URLSearchParams(window.location.search)
if (params.has("cs_cat")) {
  var selectedCategory = params.get("cs_cat")
  filterCaseStudy(selectedCategory)
  const csFilter = document.querySelector("#caseStudyFilter")
  if (csFilter) {
    csFilter.value = selectedCategory
  }
}

function filterCaseStudy(selectedCategory) {
  var display = "none"
  document.querySelectorAll(".case-studies__study").forEach(el => {
    if (selectedCategory == "-1") {
      display = "grid"
    } else {
      display = "none"
      var csCategories = el.dataset.caseStudyCategories
      if (csCategories) {
        csCategories.split("|").forEach(category => {
          if (category === selectedCategory) {
            display = ""
          }
        })
      }
    }
    el.style.display = display
  })
}

var homepageHeaderImage = document.querySelector("#homepageHeaderImage")
if (homepageHeaderImage) {
  var hiddenImages = document.querySelectorAll(".hdn-header-image")
  if (hiddenImages) {
    var index = Math.floor(Math.random() * hiddenImages.length)
    var image = hiddenImages[index]

    var source = document.createElement("source")
    var sourceSrc = image.getAttribute("data-url") + " 1200w, " + image.getAttribute("data-urlx2") + " 2400w"
    source.setAttribute("srcset", sourceSrc)
    source.setAttribute("media", "(min-width: 1380px)")
    homepageHeaderImage.appendChild(source)

    var img = document.createElement("img")
    img.setAttribute("srcset", sourceSrc)
    img.setAttribute("alt", image.getAttribute("data-alt"))
    homepageHeaderImage.appendChild(img)

    homepageHeaderImage.setAttribute("class", image.getAttribute("data-class"))
  }
}
