"use strict";

const initialCards = [
    {
        name: 'До Байкала на собаках',
        link: './images/spclforvlad.gif'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profileName = document.querySelector(".profile__name-text");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector("#name-input");
const descriptionInput = document.querySelector("#description-input");
const editForm = document.querySelector(".popup_type_edit");
const editBtn = document.querySelector(".profile__edit-btn");
const addForm = document.querySelector(".popup_type_add");
const placeTitle = document.querySelector("#place-title");
const imageUrl = document.querySelector("#image-url");
const imagePopup = document.querySelector(".popup_type_image");
const addBtn = document.querySelector(".profile__add-btn");
const cardTemplate = document.querySelector("#card-template");
const cardsGrid = document.querySelector(".cards-grid");
const figureImage = imagePopup.querySelector(".figure__image");
const figureCaption = imagePopup.querySelector(".figure__caption");

function connectCloseListener(closeBtn) {
    closeBtn.addEventListener("click", () => closePopup(closeBtn.closest(".popup")))

}

[...document.querySelectorAll(".popup__close-btn")].map((btn) => connectCloseListener(btn));

function openPopup(node) {
    node.classList.add("popup_opened");
    const form = node.querySelector(".form")
    renderFormValidation(form)
}

function closePopup(node) {
    node.classList.remove("popup_opened");

}

const openEditForm = () => {
    nameInput.value = profileName.innerText;
    descriptionInput.value = profileDescription.innerText;
    openPopup(editForm)
};

editBtn.addEventListener("click", () => openEditForm());
editForm.addEventListener("submit", (evnt) => {
    evnt.preventDefault();
    profileName.innerText = nameInput.value;
    profileDescription.innerText = descriptionInput.value;
    closePopup(editForm);
});


addForm.addEventListener("submit", (evnt) => {
    evnt.preventDefault();
    const cardNode = createNewCard(placeTitle.value,imageUrl.value);
    cardsGrid.prepend(cardNode);
    evnt.target.reset();
    closePopup(addForm);
});


function setPopupFigure(imageUrl, caption) {
    
    figureImage.src = imageUrl;
    figureImage.alt = caption;
    figureCaption.innerText = caption;
}


addBtn.addEventListener("click", () => openPopup(addForm));

function connectAllListeners(cardNode) {
    connectLikeListener(cardNode);
    connectDelListener(cardNode);
    connectImageListener(cardNode);
}

function createNewCard(title, url, addListeners = true) {
    const newCard = cardTemplate.content.cloneNode(true);
    const image = newCard.querySelector(".card__image");
    image.src = url;
    image.alt = "Изображение для " + title;
    newCard.querySelector(".card__title").innerText = title;
    if (addListeners) {
        connectAllListeners(newCard);
    }
    return newCard
}


function onloadCreateCards(cardsArray) {
    for (const card of cardsArray) {
        const cardNode = createNewCard(card.name, card.link, true);
        cardsGrid.append(cardNode);
    }
}


function connectLikeListener(cardNode) {
    cardNode.querySelector(".card__like-btn").addEventListener("click", (ev) => {
        ev.currentTarget.classList.toggle("card__like-btn_active")
    })
}

function connectDelListener(cardNode) {
    cardNode.querySelector(".card__delete-btn").addEventListener("click", (ev) => {
        ev.currentTarget.closest(".card").remove()
    })
}

function connectImageListener(cardNode) {
    cardNode.querySelector(".card__image").addEventListener("click", (ev) => {
        const caption = ev.currentTarget.closest(".card").querySelector(".card__caption").innerText;
        const imageUrl = ev.currentTarget.src;
        setPopupFigure(imageUrl, caption);
        openPopup(imagePopup);
    })
}

function hasInvalidInput(form){
    return [...form.querySelectorAll(".form__input")].some((input)=>{
        return !input.validity.valid
    })
}

function renderFormValidation(form){
    const inputLIst = [...form.querySelectorAll(".form__input")]
    const formisValid = !hasInvalidInput(form)
    const btn = form.querySelector(".form__submit-btn")
    inputLIst.map((input)=>{
        const msg = formisValid ? "": input.validationMessage
        setInputError(form, input, msg)
    })
    btnSetDisabled(btn, !formisValid)
}

function connectValidationListeners(){
    for (const form of [...document.querySelectorAll(".form")]){

        for (const input of [...form.querySelectorAll(".form__input")]){

            input.addEventListener("input", (evt)=>{
                const form = evt.target.closest(".form")
                renderFormValidation(form)
            })
        }
    }
}

function setInputError(form, input, msg){

    const errorSpan = form.querySelector(`.form__error_type_${input.id}`)
    errorSpan.innerText = msg
    if (msg){
        input.classList.add("form__input_invalid")
    } else {
        input.classList.remove("form__input_invalid")
    }
}

function btnSetDisabled(btn, state){
    if (state) {
        btn.classList.add("form__submit-btn_disabled")
    } else {
        btn.classList.remove("form__submit-btn_disabled")
    }
}



connectValidationListeners()
onloadCreateCards(initialCards);

