//Задаем основные классы и селекторы элементов валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__form-field_type_error',
    errorClass: 'popup__error_visible'
  }; 

//Показываем сообщение об ошибке ввода
const showError = (formElement, inputElement, validationMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = validationMessage;;
};

//Убираем сообщение об ошибке ввода
const hideError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.textContent = '';
  };

//Проверка валидации ввода
const checkValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, validationConfig);
      } else {
        hideError(formElement, inputElement, validationConfig);
      }
  }

  //Проверка, все ли поля прошли валидацию
const isInputValid = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
};

//Изменение кнопки Сохранить по итогам валидации
const toggleButton = (inputList, buttonElement, validationConfig) => {
    if (isInputValid(inputList, validationConfig)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

//Делаем кнопку Сохранить неактивной при открытии пустой формы
const disableButton = (formElement, validationConfig) => {
    const disableElement = formElement.querySelector(validationConfig.submitButtonSelector);
        disableElement.classList.add(validationConfig.inactiveButtonClass);
        disableElement.setAttribute('disabled', '');
};

//Добавляем универсальный слушатель событий для форм
const addEventListeners = (formElement, validationConfig) => {
   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
   
    toggleButton(inputList, buttonElement, validationConfig);
//setTimeout для обнуления после сохранения формы
    formElement.addEventListener('reset', () => {
         setTimeout(() => {
         toggleButton(inputList, buttonElement, validationConfig);
           }, 0); 
        });
   inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, validationConfig);
            toggleButton(inputList, buttonElement, validationConfig);
        });
    });
};

//Основная функция валидации данных
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
   
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
          addEventListeners(formElement, validationConfig);
        });
};

//Вызываем функцию валидации с заданными классами и селекторами
enableValidation(validationConfig);