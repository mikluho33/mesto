const profileEdit = document.querySelector('.profile__edit-button');
console.log('тест работы');
const profileClose = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const nameInput = popup.querySelector('.popup__formfield_type_name');
const descriptionInput = popup.querySelector('.popup__formfield_type_description');

function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
}


function popupClose() {
    popup.classList.remove('popup_opened');
}


function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    popupClose();
  }

profileEdit.addEventListener('click', popupOpen);
profileClose.addEventListener('click', popupClose);
popupForm.addEventListener('submit', saveProfile);


