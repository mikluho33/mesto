// Функция открытия попапов универсальная
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeKey);
}

// Функция закрытия попапов универсальная
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeKey);
}


//Закрытие попапов по кнопке Esc клавиатуры
const closeKey = (evt) => {
  evt.preventDefault();
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Универсальное закрытие попапа по оверлэю и кнопке-крестик
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
          closePopup(popup)
        }
    });
});



// Задаются значения карточки в галерее
const buttonOpenCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-card');
const formCardElement = popupAddCard.querySelector('.popup-card__form');
const titleCardInput = formCardElement.querySelector('.popup__form-field_type_title');
const linkCardInput = formCardElement.querySelector('.popup__form-field_type_link');
const elementsContainer = document.querySelector('.elements');


// Шаблон карточки
const templateCard = document.querySelector('#cards-template').content;

// Задаются значения для полноэкранного просмотра фото
const popupCard = document.querySelector('.popup-image');
const popupImage = popupCard.querySelector('.popup__image');
const popupCapture = popupCard.querySelector('.popup__capture');

// Открытие и закрытие попапа добавления фото
buttonOpenCard.addEventListener('click', function () {
    openPopup(popupAddCard);
});

// Формирование карточки
function addCard(card) {
    const elementCard = templateCard.querySelector('.element').cloneNode(true);
    const imageCard = elementCard.querySelector('.element__image');
    const titleCard = elementCard.querySelector('.element__title');

    imageCard.src = card.link;
    imageCard.alt = card.name;
    titleCard.textContent = card.name;

    // Удаление карточки
    elementCard.querySelector('.element__delete-button').addEventListener('click', function () {
    elementCard.remove();
    });

    // Лайк карточки
    elementCard.querySelector('.element__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like-button_active');
    });

    // Функция полноэкранного просмотра фото
    function openFullCard() {
      openPopup(popupCard);
      popupImage.src = card.link;
      popupImage.alt = card.name;
      popupCapture.textContent = card.name;
    }
    imageCard.addEventListener('click', openFullCard);

    return elementCard;
}
  // Добавление нового фото   
  function cardSubmit(evt) {
    evt.preventDefault();
    const newCard = {   
        name: titleCardInput.value,
        link: linkCardInput.value
    };
  
    elementsContainer.prepend(addCard(newCard));
    closePopup(popupAddCard); 
    evt.target.reset();
  };

  // Сохранение фото
  formCardElement.addEventListener('submit', cardSubmit); 

  // Добавление карточек по умолчанию
  function addInitialCards() {
    initialCards.forEach((card) => {
      const createCard = addCard(card)
      elementsContainer.append(createCard);  
    });
  }
  addInitialCards();


// Задаются значения для попапа редактирования профиля
const profileEdit = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupEditProfile = document.querySelector('.popup-profile');
const popupForm = popupEditProfile.querySelector('.popup-profile__form');
const nameInput = popupEditProfile.querySelector('.popup__form-field_type_name');
const descriptionInput = popupEditProfile.querySelector('.popup__form-field_type_description');

//Функция редактирования профиля
  profileEdit.addEventListener('click', function () {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  });
  
//Функция сохранения имени и описания профиля
function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupEditProfile);
  }

popupForm.addEventListener('submit', saveProfile);
