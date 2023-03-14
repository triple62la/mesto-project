"use strict";


function connectCloseListener(closeBtn) {
    closeBtn.addEventListener("click", () => closePopup(closeBtn.closest(".popup")))

}

[...document.querySelectorAll(".popup__close-btn")].map((btn) => connectCloseListener(btn));

function openPopup(node) {
    node.classList.add("popup_opened");
}

function closePopup(node) {
    node.classList.remove("popup_opened");

}

const profileName = document.querySelector(".profile__name-text");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.getElementById("name-input");
const descriptionInput = document.getElementById("description-input");
const editForm = document.querySelector(".popup_type_edit");
const saveBtn = editForm.querySelector(".form__submit-btn");
document.querySelector(".profile__edit-btn").addEventListener("click", () => openEditForm())
const openEditForm = () => {
    nameInput.value = profileName.innerText;
    descriptionInput.value = profileDescription.innerText;
    openPopup(editForm)
}

saveBtn.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    profileName.innerText = nameInput.value;
    profileDescription.innerText = descriptionInput.value;
    closePopup(editForm)
});

const addForm = document.querySelector(".popup_type_add");
const addFormSave = addForm.querySelector(".form__submit-btn");
addFormSave.addEventListener("click", (evnt) => {
    evnt.preventDefault();
    createNewCard(document.getElementById("place-title").value,
        document.getElementById("image-url").value);
    closePopup(addForm);
});

const imagePopup = document.querySelector(".popup_type_image");

function setPopupFigure(imageUrl, caption) {
    const image = imagePopup.querySelector(".figure__image");
    image.src = imageUrl;
    image.alt = caption;
    imagePopup.querySelector(".figure__caption").innerText = caption
}

const addBtn = document.querySelector(".profile__add-btn");
addBtn.addEventListener("click", () => openPopup(addForm));


function createNewCard(title, url, addListeners = true) {
    const newCard = document.getElementById("card-template").content.cloneNode(true);
    const image = newCard.querySelector(".card__image");
    image.src = url;
    image.alt = "Изображение для " + title;
    newCard.querySelector(".card__title").innerText = title
    if (addListeners) {
        connectAllListeners(newCard)
    }
    document.querySelector(".cards-grid").append(newCard)
}

function onloadCreateCards(cardsArray) {
    for (const card of cardsArray) {
        createNewCard(card.name, card.link, false)
    }
}

function onloadConnectListeners() {
    [...document.querySelectorAll(".card")].map((card)=>connectAllListeners(card)) ;
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

function connectAllListeners(cardNode) {
    connectLikeListener(cardNode);
    connectDelListener(cardNode);
    connectImageListener(cardNode);
}

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
onloadCreateCards(initialCards);
onloadConnectListeners()
