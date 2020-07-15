# Шаблон модального окна
Общий шаблон модального окна. Работает вплоть до IE 11.
Содержит в себе полифилл для IE 11 forEach.

Модальное окно создается по шаблону  


```<div  
    class='fili-modal'  
    data-modal-id='modal-two'>  
    <span  
        class='fili-modal__close-btn'  
        data-modal-close='close'></span>  
    <div  
        class='fili-modal__content'  
        data-modal='content'> Контент  
    </div>  
</div>  ```
      
Модификатор data-modal-show="true" определяет, будет ли модальное окно показываться при загрузке страницы

# Кнопка вывоза модального окна
`button(data-modal-button='modal-one') Вызвать модальное окно`

Кнопке присваиваем `data-modal-button='modal-one'`, значение data-атрибута совпадает с data-modal-id модального окна.

# Команды
Чтобы запустить development режим - npm start  
Чтобы запустить режим сборки - npm run build
