let instance: any;

class FiliModule {
  constructor() {
    if (!instance) instance = this;
    instance.count = 0;
    return instance;
  }
}

export const filiModule = new FiliModule();

(<any>window)['FiliModule'] = FiliModule;