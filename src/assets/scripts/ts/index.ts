document.addEventListener('DOMContentLoaded', () => {

  createModal('modal-one', true);
  createModal('modal-two');

  function createModal(id, show: boolean = false): void {
    const btn: HTMLElement = document.getElementById(id);
    const modal: HTMLElement = document.querySelector(`[data-modal-id=${ id }]`);

    if (!btn) return;

    /**
     * Объект, в котором содержится бизнес-логика
     */
    const _mainFuncs = {
      showModal() {
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
    };

    if (show) {
      _mainFuncs.showModal();
    }

    btn.addEventListener('click', _mainFuncs.showModal);
  }
});
