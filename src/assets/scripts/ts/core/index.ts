import { filiModal } from "../modal";
import { switchBanners } from "../switchBanners";

let instance: any;

class FiliModule {
  constructor() {
    if (!instance) instance = this;
    return instance;
  }
}

export const filiModule = new FiliModule();
(<any>window).filiModule = filiModule;

(<any>filiModule).modal = {
  init: filiModal
};

(<any>filiModule).switchBanners = {
  loadBanner: switchBanners.loadBanner
};
