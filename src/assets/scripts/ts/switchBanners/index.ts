type TBanner = {
  time: number, // Время в минутах,
  endTime: number, // Время конец, по умолчанию ноль
  name: string,
  [key: string]: string | number
}

export const switchBanners = (function () {
  let _self;

  /**
   * Функция проверки времени для localStorage
   * @param banner
   * @returns {boolean}
   */
  function isTimeOver(banner: TBanner) {
    const now = new Date().getTime(); // Сколько миллисек сейчас
    return banner.endTime - now > 0;
  }

  /**
   * Функция установки баннера в storage
   */
  function setBannerInStorage(banner: TBanner) {
    const now = new Date().getTime(); // Сколько миллисек сейчас

    if (banner.time) {
      banner.endTime = now + banner.time * 60 * 1000; // Установка срока действия
      localStorage.setItem(banner.name, JSON.stringify(banner));
    }
  }

  /**
   * Логика на странице about
   */
  function checkThisBanners(bannersArray: TBanner[] = [], cb = (banner: TBanner) => {
  }) {
    /**
     * Как работает цикл. Он проходит по всем баннерам, берет name и обращается по нему в localStorage
     * Если баннера нет, мы записываем данные в LS, а потом показываем баннер и прекращаем цикл.
     * Если баннер есть, мы проверяем срок жизни баннера. Если он истек, то мы заново устанавливаем баннер и новый срок
     * Если нет, то идем дальше в цикле.
     */
    for (let j = 0; j < bannersArray.length; j++) {
      const banner = bannersArray[j];
      const bannerFromStorage = localStorage.getItem(banner.name);

      if (bannerFromStorage) {
        const bannerData = JSON.parse(bannerFromStorage);

        // Если время истекло, то показываю баннер и останавливаю цикл
        if (!isTimeOver(bannerData)) {
          setBannerInStorage(banner);
          cb(banner); // Пользовательский callback
          break;
        }
      } else {
        setBannerInStorage(banner);
        cb(banner);
        break;
      }
    }
  }

  return {
    init: function () {
      _self = this; // Привязываю контекст при инициализации
    },
    loadBanner: checkThisBanners
  };
}());

switchBanners.init();