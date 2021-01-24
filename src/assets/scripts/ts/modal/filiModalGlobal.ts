import openModal from "./openModal";
import { state } from "./index";
import { filiModule } from "../core";

/**
 * Запись в глобальный объект window для работы со сторонними библиотеками
 */
export default function filiModalGlobal(state: state) {
  filiModule.modal.open = function (id: string): void {
    state.modal = document.querySelector(`[data-modal-id="${ id }"]`); // Переопределяем модалку

    if (state.modal) {
      openModal(state);
    }
  };

  filiModule.modal.state = state;
}