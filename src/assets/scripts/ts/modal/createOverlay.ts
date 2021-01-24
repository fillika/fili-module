/**
 * Создание overlay
 */
export default function createOverlay(): HTMLElement {
  const overlay = document.createElement("div");
  overlay.classList.add("fili-overlay");
  overlay.classList.add("fili-overlay--is-hidden");
  document.body.insertAdjacentElement('afterbegin', overlay);
  return overlay;
}