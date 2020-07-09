;(function (): void {
  type LoaderConstructor = {
    images: object[],
    jsons: object[],
  }

  interface iObject {
    name: string,
    src: string
  }

  class Loader {
    resources: LoaderConstructor;
    loadOrder: LoaderConstructor;

    constructor() {
      this.loadOrder = {
        images: [],
        jsons: [],
      };

      this.resources = {
        images: [],
        jsons: [],
      };
    }

    static loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise(((resolve, reject) => {
        try {
          const image = new Image;

          image.onload = () => resolve(image);
          image.src = src;
        } catch (e) {
          reject(e);
        }
      }));
    }

    static loadJsons(src: string): Promise<HTMLImageElement> {

      return new Promise(((resolve, reject) => {
        fetch(src)
          .then(result => result.json())
          .then(resolve)
          .catch(reject);
      }));
    }

    /**
     * Функция загрузки изображения проходит по очереди по всем изображениям
     * Далее она загружает нужные изображения через static method, а потом удаляет
     * изображение из очереди загрузки
     * @param {function} callback
     */
    load(callback: () => void): void {
      const promises = [];

      for (const imageData of this.loadOrder.images) {
        //TODO: Разобраться с деструктуризацией
        const { name, src } = imageData;

        const promise = Loader
          .loadImage(src)
          .then(image => {
            this.resources.images[name] = image;

            //Удаление изображения из очереди загрузки
            if (this.loadOrder.images.includes(imageData)) {
              const index = this.loadOrder.images.indexOf(imageData);
              this.loadOrder.images.splice(index, 1);
            }
          });
      }

      for (const jsonsData of this.loadOrder.jsons) {
        //TODO: Разобраться с деструктуризацией
        const { name, src } = jsonsData;

        const promise = Loader
          .loadJsons(src)
          .then(json => {
            this.resources.jsons[name] = json;

            //Удаление изображения из очереди загрузки
            if (this.loadOrder.jsons.includes(jsonsData)) {
              const index = this.loadOrder.jsons.indexOf(jsonsData);
              this.loadOrder.jsons.splice(index, 1);
            }
          });
      }

      Promise.all(promises).then(callback);
    }

    /**
     * Метод добавления изображения в loadOrder
     */
    addImage(name: string, src: string): void {
      const image: iObject = { name, src };

      this.loadOrder.images.push(image);
    }

    addJson(name: string, src: string) {
      const image: iObject = { name, src };

      this.loadOrder.jsons.push(image);
    }
  }

  (<any>window).GameEngine = (<any>window).GameEngine || {};
  (<any>window).GameEngine.Loader = Loader;
})();
