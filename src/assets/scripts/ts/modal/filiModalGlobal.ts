import openModal from "./openModal";
import { state } from "./index";

/**
 * Запись в глобальный объект window для работы со сторонними библиотеками
 */
export default function filiModalGlobal(state: state) {
  (<any>window).filiModule.modal.open = function (id: string): void {
    state.modal = document.querySelector(`[data-modal-id="${ id }"]`); // Переопределяем модалку

    if (state.modal) {
      openModal(state);
    }
  };

  (<any>window).filiModule.modal.state = state;
}