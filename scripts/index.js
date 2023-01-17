// Задаются данные карточек по умолчанию
const initialCards = [
{
    name: 'Карачаевск',
    link: '../images/karachaevsk.jpg'
},
{
    name: 'Гора Эльбрус',
    link: '../images/elbrus.jpg'
},
{
    name: 'Домбай',
    link: '../images/dombai.jpg'
},
{
    name: 'Гора Эльбрус',
    link: '../images/elbrus.jpg'
},
{
    name: 'Домбай',
    link: '../images/dombai.jpg'
},
{
    name: 'Карачаево-Черкесия',
    link: '../images/karachaevsk.jpg'
}
];

// Добавление карточки в галерею
const buttonOpenCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-card');
const buttonCloseCard = popupAddCard.querySelector('.popup__close-button');
const formCardElement = popupAddCard.querySelector('.popup-card__form');
const titleCardInput = formCardElement.querySelector('.popup__form-field_type_title');
const linkCardInput = formCardElement.querySelector('.popup__form-field_type_link');
const elementsContainer = document.querySelector('.elements');

// Шаблон карточки
const templateCard = document.querySelector('#cards-template').content;


// Открытие и закрытие попапа фото
buttonOpenCard.addEventListener('click', function () {
    openPopup(popupAddCard);
});

  buttonCloseCard.addEventListener('click', function () {
    closePopup(popupAddCard);
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
    elementCard.querySelector('.element__like-button').addEventListener('click', function (like) {
    like.target.classList.toggle('element__like-button_active');
    });

    return elementCard;
}
    
    function cardSubmit(evt) {
    evt.preventDefault();
    const newCard = {   
        name: titleCardInput.value,
        link: linkCardInput.value
    };
  
    elementsContainer.prepend(addCard(newCard)); // Добавляем новое фото
    closePopup(popupAddCard); 
    evt.target.reset();
  };

  formCardElement.addEventListener('submit', cardSubmit); // Отправка формы карточки


  function addInitialCards() {
    initialCards.forEach((card) => {
      const createCard = addCard(card)
      elementsContainer.append(createCard);  
    });
  }
  addInitialCards();


// Задаются значения для попапа редактирования профиля
const profileEdit = document.querySelector('.profile__edit-button');
const profileClose = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupEditProfile = document.querySelector('.popup-profile');
const popupForm = popupEditProfile.querySelector('.popup-profile__form');
const nameInput = popupEditProfile.querySelector('.popup__form-field_type_name');
const descriptionInput = popupEditProfile.querySelector('.popup__form-field_type_description');

// Функция добавления карточки
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
  }
  
  const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
  }

//Функция редактирования профиля
  profileEdit.addEventListener('click', function () {
    openPopup(popupEditProfile);
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
  });
  profileClose.addEventListener('click', function () {
    closePopup(popupEditProfile);
  });
  
//Функция сохранения имени и описания профиля
function saveProfile(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(popupEditProfile);
  }

popupForm.addEventListener('submit', saveProfile);
