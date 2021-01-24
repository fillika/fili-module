# Шаблон модального окна
Общий шаблон модального окна. Работает вплоть до IE 11.
Содержит в себе полифилл для IE 11 forEach.

Модальное окно создается по шаблону  

```
<div class='fili-modal' data-modal-id='modal-two'>  
    <span class='fili-modal__close-btn' data-modal-close='close'>
      <svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
        <g id='cross'>
          <line class='cls-1' x1='7' x2='25' y1='7' y2='25'></line>
          <line class='cls-1' x1='7' x2='25' y1='25' y2='7'></line>
        </g>
      </svg>
    </span>  
    <div class='fili-modal__content' data-modal='content'> Контент </div>  
</div>  
```
      
Модификатор data-modal-show="true" определяет, будет ли модальное окно показываться при загрузке страницы

# Кнопка вывоза модального окна
`button(data-modal-button='modal-two') Вызвать модальное окно`

Кнопке присваиваем `data-modal-button='modal-two'`, значение data-атрибута совпадает с data-modal-id модального окна.

# События при закрытии и открытии окна
Добавляем к имени окна data-modal-id *-open* и *-close* и получим события, которые отрабатывают
при открытии и закрытии окна

document.addEventListener('modal-one-open', () => console.log('modal-one-open'));
document.addEventListener('modal-one-close', () => console.log('modal-one-close'));

# Функционал
В перспективе модальное окно будет частью общего модуля *filiModule*, в котором будут другие вспомогательные функции.

Чтобы инициализировать модуль, нужно вызвать функцию
*filiModule.modal.init(config);*

config - это объект с параметрами. Это необязательный параметр.
```
const config = {
  showClassName: "filiModalFadeInDown",
  hideClassName: "filiModalFadeOutUp",
  baseIndex: 10000,
  delay: 450,
}
```
*showClassName* - класс, который будет присвоен, когда модальное окно вызвано (на него вешать анимацию появления)

*hideClassName* - класс, который будет присвоен, когда модальное окно будет убрано (на него вешать анимацию исчезновения)

*baseIndex* - zIndex для модального окна. Может быть открыто несколько окон, поэтому у следующего модального окна zIndex всегда будет выше.

*delay* - Задержка в MS, после которой исчезает оверлей (затемнение)

Чтобы вызвать модальное окно вручную, нужно вызвать функцию **filiModule.modal.open('{ID}')** указав ID нужного модального окна
Например: **filiModule.modal.open('modal-two')**


# Команды
Чтобы запустить development режим - **npm start**  
Чтобы запустить режим сборки - **npm run build**
