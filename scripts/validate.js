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
const showError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = errorMessage;;
};

//Убираем сообщение об ошибке ввода
const hideError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
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

//Изменение кнопки по итогам валидации
const toggleButton = (inputList, buttonElement, validationConfig) => {
    if (isInputValid(inputList, validationConfig)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

//Делаем кнопку неактивной при открытии формы
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
   inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, validationConfig);
            toggleButton(inputList, buttonElement, validationConfig);
        });
    });
};

  const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
   
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
          addEventListeners(formElement, validationConfig);
        });
};

enableValidation(validationConfig);

