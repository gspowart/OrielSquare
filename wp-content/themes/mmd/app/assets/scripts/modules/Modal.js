class Modal {
  constructor() {
    this.modal = document.querySelector(".modal")
    this.closeIcon = document.querySelector(".modal__close")

    if (this.modal) {
      this.events()
    }
  }

  events() {
    // Listen for close
    this.closeIcon.addEventListener("click", () => this.closeTheModal())
    this.modal.addEventListener("click", e => {
      if (!e.target.closest(".wrapper")) {
        this.closeTheModal()
      }
    })

    // Listen for Escape
    document.addEventListener("keyup", e => this.keyPressHandler(e))
  }

  openTheModal() {
    this.modal.classList.add("modal--is-visible")
  }

  closeTheModal() {
    this.modal.classList.remove("modal--is-visible")
  }

  keyPressHandler(e) {
    if (e.keyCode == 27) {
      this.closeTheModal()
    }
  }
}

export default Modal
