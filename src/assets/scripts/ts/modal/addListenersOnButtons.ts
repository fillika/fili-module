/**
 * Функция находит все кнопки по селектору и вешает на событие клик открытие модального окна
 * @param modal - (активная) модалка
 * @param openModal - функция открытия модального окна
 */
import { state } from "./index";
import openModal from "./openModal";

export default function addListenersOnButtons(state: state) {
  const buttons: NodeList = document.querySelectorAll(`[data-modal-button]`);

  function initModal(button: Node): void {
    button.addEventListener("click", function (this: HTMLElement, event): void {
      event.preventDefault();

      const id = this.dataset.modalButton;

      state.modal = document.querySelector(`[data-modal-id="${ id }"]`); // Переопределяем модалку

      if (state.modal) {
        openModal(state);
      }
    });
  }

  /**
   * Запуск события клика на модальное окно
   */
  buttons.forEach(initModal);
}


