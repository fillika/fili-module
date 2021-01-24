import { state } from "./index";

export default function openModal(state: state): void {
  if (state.modal) {
    const id = state.modal.getAttribute("data-modal-id");
    let {
      showClassName = 'filiModalFadeInDown',
      hideClassName = 'filiModalFadeOutUp',
    } = state.initConfig;

    // Классы и стили
    document.body.classList.add('no-scroll');
    state.modal.classList.remove("fili-modal--is-hidden", hideClassName);
    state.modal.classList.add("fili-modal--is-visible", showClassName); // Добавляем класс для показа модалки
    state.overlay.classList.remove("fili-overlay--is-hidden");

    if (state.initConfig.baseIndex) {
      state.initConfig.baseIndex++; // Увеличиваю zIndex
      state.modal.style.zIndex = state.initConfig.baseIndex.toString();
    }

    // Добавляю модалки в очередь. Тут все открытые модалки
    state.modalQueue.push(state.modal);

    if (typeof id === "string") {
      const event = new CustomEvent(id + "-open", { bubbles: true });
      document.dispatchEvent(event);
    }
  }
}