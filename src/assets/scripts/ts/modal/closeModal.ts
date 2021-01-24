import { state } from "./index";

export default function closeModal(state: state): void {
  const id = state.modal?.getAttribute("data-modal-id");
  let {
    showClassName = 'filiModalFadeInDown',
    hideClassName = 'filiModalFadeOutUp',
    delay = 450
  } = state.initConfig;

  // Классы и стили через promise
  const promise = new Promise<HTMLElement | null>(resolve => {
    if (state.modal) {
      state.modal.classList.add("fili-modal--is-hidden", hideClassName);
      state.modal.classList.remove("fili-modal--is-visible", showClassName);

      if (state.initConfig.baseIndex) {
        state.initConfig.baseIndex--; // Увеличиваю zIndex
        state.modal.style.zIndex = state.initConfig.baseIndex.toString();
      }

      resolve(state.modal);
    }
  })
    .then((modal: HTMLElement | null) => {
      const timerID = setTimeout(function () {
        modal?.classList.remove("fili-modal--is-hidden", hideClassName);
        clearTimeout(timerID);
      }, delay);
    })
    .catch(err => console.log(err));

  // Очередь. Фильтруем, удаляем лишние
  state.modalQueue = state.modalQueue.filter((modal) => {
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
  if (state.modalQueue.length === 0) {
    // Убираю overlay с задержкой
    const timerID = setTimeout(function () {
      state.overlay.classList.add("fili-overlay--is-hidden"); // Скрываем оверлей
      document.body.classList.remove('no-scroll');
      clearTimeout(timerID);
    }, delay);
  } else {
    state.modal = state.modalQueue[state.modalQueue.length - 1];
  }
}
