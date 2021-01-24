/**
 * Функция вешает на все элементы на странице с дата-атрибутом {data-modal-close="close"}
 * Событие клик, которое запускает функцию closeModal
 * @param closeModal
 */
import { state } from "./index";
import closeModal from "./closeModal";

export default function closeModalButtons(state: state): void {
  const closeButton: NodeList = document.querySelectorAll('[data-modal-close="close"]');
  closeButton.forEach((btn: Node) => btn.addEventListener("click", () => closeModal(state)));
}