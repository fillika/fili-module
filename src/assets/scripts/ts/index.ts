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

  createModal();

  function createModal(): void {
    const buttons = document.querySelectorAll(`[data-modal-button]`);
    let modal = document.querySelector(`[data-modal-show="true"]`);

    /**
     * Объект, в котором содержится бизнес-логика
     */
    const _mainFuncs = {
      showModal(e) {
        e.preventDefault();
        const id = this.dataset.modalButton;
        modal = document.querySelector(`[data-modal-id=${ id }]`);

        modal.classList.remove('fili-modal--is-hidden');
        modal.classList.add('fili-modal--is-visible');
        _mainFuncs.createOverlay();
      },
      createOverlay() {
        const div = document.createElement('div');
        div.classList.add('fili-overlay');
        document.body.appendChild(div);

        div.addEventListener('click', (e) => {
          modal.classList.add('fili-modal--is-hidden');
          modal.classList.remove('fili-modal--is-visible');
          _mainFuncs.destroyOverlay(div);
        });
      },
      destroyOverlay(el: HTMLElement) {
        document.body.removeChild(el);
      },
      firstShow(modal) {
        modal.classList.remove('fili-modal--is-hidden');
        modal.classList.add('fili-modal--is-visible');
        _mainFuncs.createOverlay();
      },
    };

    if (modal) {
      _mainFuncs.firstShow(modal);
    }

    buttons.forEach(button => button.addEventListener('click', _mainFuncs.showModal));
  }
});
