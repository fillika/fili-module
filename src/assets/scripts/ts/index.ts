document.addEventListener("DOMContentLoaded", () => {
  (function () {
    if (typeof window.CustomEvent === 'function') return false;

    function CustomEvent(event: any, params: any) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      const evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    (<any>window).CustomEvent = CustomEvent;
  })();

  filiModal();

  function filiModal() {
    const buttons: NodeList = document.querySelectorAll(`[data-modal-button]`);
    const overlay = createOverlay(); // Создаем overlay

    let modal = document.querySelector(`[data-modal-show="true"]`); // Если модалка должна открываться при загрузке
    // страницы
    let closeButton: NodeList;

    if (modal) {
      init();
    }

    function openModal(button: Node): void {
      button.addEventListener("click", function (this: HTMLElement): void {
        const id = this.dataset.modalButton;
        modal = document.querySelector(`[data-modal-id="${ id }"]`); // Переопределяем модалку

        if (modal) {
          init();
        }
      });
    }

    /**
     * Метод для вызова сторонним скриптом модального окна.
     * @param {string} id - это data-modal-id
     */
    (<any>window).filiModal = {
      open: function (id: string): void {
        modal = document.querySelector(`[data-modal-id="${ id }"]`); // Переопределяем модалку

        if (modal) {
          init();
        }
      },
      close: function () {

      }
    };

    /**
     * Создание overlay
     */
    function createOverlay(): HTMLElement {
      const overlay = document.createElement("div");
      overlay.classList.add("fili-overlay");
      overlay.classList.add("fili-overlay--is-hidden");
      document.body.appendChild(overlay);
      return overlay;
    }

    function closeModal(): void {
      const id = modal?.getAttribute('data-modal-id');
      modal?.classList.add("fili-modal--is-hidden");
      modal?.classList.remove("fili-modal--is-visible");

      if (typeof id === 'string') {
        const event = new CustomEvent(id + '-close', { bubbles: true });
        document.dispatchEvent(event);
      }

      closeButton.forEach((btn: Node) =>
        btn.removeEventListener("click", closeModal)
      );

      overlay.removeEventListener("click", closeModal); // Удаляем обработчик
      overlay.classList.add("fili-overlay--is-hidden"); // Скрываем оверлей

      const timerID = setTimeout(function () {
        modal?.classList.remove("fili-modal--is-hidden");
        clearTimeout(timerID);
      }, 500);
    }

    function init(): void {
      if (modal) {
        const id = modal?.getAttribute('data-modal-id');

        modal.classList.remove("fili-modal--is-hidden");
        modal.classList.add("fili-modal--is-visible");
        overlay.classList.remove("fili-overlay--is-hidden");

        if (typeof id === 'string') {
          const event = new CustomEvent(id + '-open', { bubbles: true });
          document.dispatchEvent(event);
        }

        closeButton = modal.querySelectorAll('[data-modal-close="close"]');
      }

      closeButton.forEach((btn: Node) =>
        btn.addEventListener("click", closeModal)
      );

      overlay.addEventListener("click", closeModal);
    }

    /**
     * Запуск события клика на модальное окно
     */
    buttons.forEach(openModal);
  }
});
