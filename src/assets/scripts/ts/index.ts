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

  filiModal();

  function filiModal() {
    const buttons = document.querySelectorAll(`[data-modal-button]`);
    let modal = document.querySelector(`[data-modal-show="true"]`); // Если модалка должна открываться при загрузке
    // страницы
    let closeButton;
    let overlay;

    if (modal) {
      init();
    }

    function openModal(button) {
      button.addEventListener('click', function () {
        const id = this.dataset.modalButton;
        modal = document.querySelector(`[data-modal-id="${ id }"]`); // Переопределяем модалку

        init();
      });
    }

    /**
     * Создание overlay
     */
    function createOverlay() {
      const overlay = document.createElement('div');
      overlay.classList.add('fili-overlay');
      document.body.appendChild(overlay);
      return overlay;
    }

    function closeModal() {
      modal.classList.add('fili-modal--is-hidden');
      modal.classList.remove('fili-modal--is-visible');

      overlay.classList.remove('fili-overlay');
      document.body.removeChild(overlay);

      closeButton.removeEventListener('click', closeModal);
      overlay.removeEventListener('click', closeModal);

      const timerID = setTimeout(function () {
        modal.classList.remove('fili-modal--is-hidden');
        clearTimeout(timerID);
      }, 500);
    }

    function init() {
      closeButton = modal.querySelector('[data-modal-close="close"]');

      overlay = createOverlay(); // Переопределяем оверлей

      modal.classList.remove('fili-modal--is-hidden');
      modal.classList.add('fili-modal--is-visible');

      closeButton.addEventListener('click', closeModal);
      overlay.addEventListener('click', closeModal);
    }

    /**
     * Запуск события клика на модальное окно
     */
    buttons.forEach(openModal);
  }
});
