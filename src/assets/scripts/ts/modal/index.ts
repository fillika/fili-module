import createOverlay from "./createOverlay";
import addListenersOnButtons from "./addListenersOnButtons";
import closeModalButtons from "./closeModalButtons";
import openModal from "./openModal";
import closeModal from "./closeModal";
import filiModalGlobal from "./filiModalGlobal";

type config = {
  showClassName?: string;
  hideClassName?: string;
  baseZIndex?: number;
  delay?: number;
};

export type state = {
  modalQueue: HTMLElement[];
  initConfig: config;
  modal: HTMLElement | null;
  overlay: HTMLElement;
};

function filiModal(config?: config) {
  const state: state = {
    modalQueue: [], // Очередь из попапов,
    initConfig: {
      showClassName: "filiModalFadeInDown",
      hideClassName: "filiModalFadeOutUp",
      baseZIndex: 10000,
      delay: 450,
    },
    modal: document.querySelector(`[data-modal-show="true"]`),
    overlay: createOverlay()
  };

  if (config) {
    state.initConfig = config;
  }

  // Если есть подходящий селектор, то окно будет появляться при каждой загрузке страницы
  if (state.modal) {
    openModal(state);
  }

  state.overlay.addEventListener("click", () => closeModal(state));
  addListenersOnButtons(state);
  closeModalButtons(state);
  filiModalGlobal(state);
}

(<any>window).filiModule = {
  modal: {
    init: filiModal,
    open: undefined,
  },
};

filiModule.modal.init();