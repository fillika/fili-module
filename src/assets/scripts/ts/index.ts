document.addEventListener("DOMContentLoaded", () => {
  (function () {
    if (typeof window.CustomEvent === "function") return false;

    function CustomEvent(event: any, params: any) {
      params = params || { bubbles: false, cancelable: false, detail: null };
      const evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    (<any>window).CustomEvent = CustomEvent;
  })();

  filiModal();

  function filiModal() {
    const buttons: NodeList = document.querySelectorAll(`[data-modal-button]`);
    const overlay = createOverlay(); // Создаем overlay
    let modalQueue: HTMLElement[] = []; // Очередь из попапов
    let baseZindex = 10000;

    let modal: HTMLElement | null = document.querySelector(`[data-modal-show="true"]`); // Если модалка должна открываться при загрузке
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
      },
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
      const id = modal?.getAttribute("data-modal-id");

      // Классы и стили
      if (modal) {
        modal.classList.add("fili-modal--is-hidden");
        modal.classList.remove("fili-modal--is-visible");
        baseZindex--; // Увеличиваю zIndex
        modal.style.zIndex = baseZindex.toString();
      }

      // Очередь
      modalQueue = modalQueue.filter((modal) => {
        const modalId = modal.getAttribute("data-modal-id");
        return modalId !== id;
      });

      if (typeof id === "string") {
        const event = new CustomEvent(id + "-close", { bubbles: true });
        document.dispatchEvent(event);
      }

      /**
       * Здесь мы проверяем очередь и если у нас открыто более 1 модального окна,
       * то пока очередь не кончится мы не скрываем оверлей. Удалять модалки (закрывать)
       * начинаем по очереди (3-2-1)
       */
      if (modalQueue.length === 0) {
        overlay.removeEventListener("click", closeModal); // Удаляем обработчик
        overlay.classList.add("fili-overlay--is-hidden"); // Скрываем оверлей
        closeButton.forEach((btn: Node) => btn.removeEventListener("click", closeModal));
        document.body.classList.remove('no-scroll');
      } else {
        modal = modalQueue[modalQueue.length - 1];
      }

      const timerID = setTimeout(function () {
        modal?.classList.remove("fili-modal--is-hidden");
        clearTimeout(timerID);
      }, 500);
    }

    function init(): void {
      if (modal) {
        const id = modal.getAttribute("data-modal-id");

        // Классы и стили
        document.body.classList.add('no-scroll');
        modal.classList.remove("fili-modal--is-hidden");
        modal.classList.add("fili-modal--is-visible");
        overlay.classList.remove("fili-overlay--is-hidden");
        baseZindex++; // Увеличиваю zIndex
        modal.style.zIndex = baseZindex.toString();

        // Добавляю модалки в очередь. Тут все открытые модалки
        modalQueue.push(modal);

        if (typeof id === "string") {
          const event = new CustomEvent(id + "-open", { bubbles: true });
          document.dispatchEvent(event);
        }

        closeButton = modal.querySelectorAll('[data-modal-close="close"]');
      }

      closeButton.forEach((btn: Node) => btn.addEventListener("click", closeModal));

      overlay.addEventListener("click", closeModal);
    }

    /**
     * Запуск события клика на модальное окно
     */
    buttons.forEach(openModal);
  }
});
