// Задаются значения для попапа редактирования профиля
const profileEdit = document.querySelector('.profile__edit-button');
const profileClose = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__form-field_type_name');
const descriptionInput = popup.querySelector('.popup__form-field_type_description');

//Функция открытия попапа редактирования профиля
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}

//Функция закрытия попапа редактирования профиля
function closePopup() {
    popup.classList.remove('popup_opened');
}

//Функция сохранения имени и описания профиля
function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
  }

//Кнопки открытия, закрытия и сохранения для профиля
profileEdit.addEventListener('click', openPopup);
profileClose.addEventListener('click', closePopup);
popupForm.addEventListener('submit', saveProfile);


