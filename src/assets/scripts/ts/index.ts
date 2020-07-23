document.addEventListener("DOMContentLoaded", () => {
  if ("NodeList" in window && !NodeList.prototype.forEach) {
    console.info("polyfill for IE11");
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (let i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

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
        modal = document.querySelector(`[data-modal-id="${id}"]`); // Переопределяем модалку

        if (modal) {
          init();
        }
      });
    }

    /**
     * Создание overlay
     */
    function createOverlay(): HTMLElement {
      const overlay = document.createElement("div");
      overlay.classList.add("fili-overlay", "fili-overlay--is-hidden");
      document.body.appendChild(overlay);
      return overlay;
    }

    function closeModal(): void {
      modal?.classList.add("fili-modal--is-hidden");
      modal?.classList.remove("fili-modal--is-visible");

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
      modal?.classList.remove("fili-modal--is-hidden");
      modal?.classList.add("fili-modal--is-visible");
      overlay.classList.remove("fili-overlay--is-hidden");

      if (modal) {
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
