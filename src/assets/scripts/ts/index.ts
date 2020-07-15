document.addEventListener('DOMContentLoaded', () => {
  if ('NodeList' in window && !NodeList.prototype.forEach) {
    console.info('polyfill for IE11');
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (let i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  class FiliModal {
    buttons: NodeList;
    modal: HTMLElement;
    closeBtn: HTMLElement;

    constructor() {
      this.buttons = document.querySelectorAll(`[data-modal-button]`);
      this.modal = document.querySelector(`[data-modal-show="true"]`);

      if (this.modal) {
        this.closeBtn = this.modal.querySelector('[data-modal-close="close"]');
      }
    }

    init() {
      if (this.modal) {
        this.firstShow(this.modal);
      }

      this.buttons.forEach(button => button.addEventListener('click', this.showModal));
    }

    showModal = (e) => {
      e.preventDefault();
      const id = e.target.dataset.modalButton;
      this.modal = document.querySelector(`[data-modal-id=${ id }]`);

      this.modal.classList.remove('fili-modal--is-hidden');
      this.modal.classList.add('fili-modal--is-visible');

      this.close(this.modal);
    };

    closeModal = overlay => {
      this.modal.classList.add('fili-modal--is-hidden');
      this.modal.classList.remove('fili-modal--is-visible');

      let timerId = setTimeout(() => {
        this.modal.classList.remove('fili-modal--is-hidden');
        clearTimeout(timerId);
      }, 500);

      this.destroyOverlay(overlay);
    };

    createOverlay = () => {
      const overlay = document.createElement('div');
      overlay.classList.add('fili-overlay');
      document.body.appendChild(overlay);

      return overlay;
    };

    destroyOverlay = (el: HTMLElement) => {
      try {
        const parent = el.parentNode;
        parent.removeChild(el);
      } catch (err) {
        console.info(err);
      }
    };

    firstShow = modal => {
      modal.classList.remove('fili-modal--is-hidden');
      modal.classList.add('fili-modal--is-visible');

      this.close(modal);
    };

    close = modal => {
      const closeButton = modal.querySelector('[data-modal-close="close"]');

      const overlay = this.createOverlay();

      overlay.addEventListener('click', e => this.closeModal(overlay));
      closeButton.addEventListener('click', e => this.closeModal(overlay));
    };
  }

  // const m = new FiliModal();
  // m.init();

  f();

  function f() {
    const buttons = document.querySelectorAll(`[data-modal-button]`);
    let modal = document.querySelector(`[data-modal-show="true"]`);

    const showModal = (e) => {
      e.preventDefault();
      const id = e.target.dataset.modalButton;
      modal = document.querySelector(`[data-modal-id=${ id }]`);

      modal.classList.remove('fili-modal--is-hidden');
      modal.classList.add('fili-modal--is-visible');

      close(modal);
    };

    const createOverlay = () => {
      const overlay = document.createElement('div');
      overlay.classList.add('fili-overlay');
      document.body.appendChild(overlay);

      return overlay;
    };

    const destroyOverlay = (el: HTMLElement) => {
      try {
        const parent = el.parentNode;
        parent.removeChild(el);
      } catch (err) {
        console.info(err);
      }
    };

    const closeModal = (modal, overlay) => {
      modal.classList.add('fili-modal--is-hidden');
      modal.classList.remove('fili-modal--is-visible');

      let timerId = setTimeout(() => {
        modal.classList.remove('fili-modal--is-hidden');
        clearTimeout(timerId);
      }, 500);

      destroyOverlay(overlay);
    };

    const close = modal => {
      const closeButton = modal.querySelector('[data-modal-close="close"]');

      const overlay = createOverlay();

      overlay.addEventListener('click', e => closeModal(modal, overlay));
      closeButton.addEventListener('click', e => closeModal(modal, overlay));
    };

    // Первый показ
    if (modal) {
      const closeBtn = modal.querySelector('[data-modal-close="close"]');

      modal.classList.remove('fili-modal--is-hidden');
      modal.classList.add('fili-modal--is-visible');
      close(modal);
    }

    buttons.forEach(button => button.addEventListener('click', showModal));
  }
});
