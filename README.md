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

Чтобы вызвать модальное окно вручную, нужно запустите глобально функцию *filiModalOpen(id)* указав ID нужного модального окна

# Команды
Чтобы запустить development режим - **npm start**  
Чтобы запустить режим сборки - **npm run build**
