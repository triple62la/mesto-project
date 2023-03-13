"use strict";


class Popup {
    constructor(popupSelector) {
        this.selector = popupSelector;
        this.closeBtn = this.node.querySelector(".popup__close-btn");
        this.closeBtn.addEventListener("click", () => this.close());
    }

    get node() {
        return document.querySelector(this.selector);
    }

    open() {
        this.node.classList.add("popup_opened");
    }

    close() {
        this.node.classList.remove("popup_opened");
    }
}


class EditForm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.saveBtn = this.node.querySelector(".form__submit-btn");
        this.saveBtn.addEventListener("click", (evnt) => {
            evnt.preventDefault();
            profile.name = this.name;
            profile.description = this.description;
            this.close()
        });
        this.nameInput = document.getElementById("name-input");
        this.descriptionInput = document.getElementById("description-input");
    }

    get name() {
        return this.nameInput.value
    }

    set name(value) {
        this.nameInput.value = value;
    }

    get description() {
        return this.descriptionInput.value
    }

    set description(value) {
        this.descriptionInput.value = value;
    }

    open() {
        super.open();
        this.name = profile.name;
        this.description = profile.description;
    }

}

class AddForm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.smbtBtn = this.node.querySelector(".form__submit-btn");
        this.placeTitle = document.getElementById("place-title");
        this.imageUrl = document.getElementById("image-url");
        this.smbtBtn.addEventListener("click", (evnt) => {
            evnt.preventDefault();
            cards.createNewCard(this.placeTitle.value, this.imageUrl.value)
            this.close()
        });
    }
}

class ImagePopup extends Popup {
    constructor() {
        super(".popup_type_image");
    }

    setFigure(imageUrl, caption) {
        const image = this.node.querySelector(".figure__image");
        image.src = imageUrl;
        image.alt = caption;
        this.node.querySelector(".figure__caption").innerText = caption
    }

}


class Profile {
    constructor() {
        this.editBtn = document.querySelector(".profile__edit-btn");
        this.editBtn.addEventListener("click", () => editForm.open())
        this.addBtn = document.querySelector(".profile__add-btn");
        this.addBtn.addEventListener("click", () => addForm.open());
    }

    get name() {
        return document.querySelector(".profile__name-text").innerText;
    }

    set name(value) {
        document.querySelector(".profile__name-text").innerText = value;
    }

    get description() {
        return document.querySelector(".profile__description").innerText;
    }

    set description(value) {
        document.querySelector(".profile__description").innerText = value;
    }

}

class Cards {

    createNewCard(title, url, addListeners = true) {
        const newCard = document.getElementById("card-template").content.cloneNode(true);
        const image = newCard.querySelector(".card__image");
        image.src = url;
        image.alt = "Изображение для " + title;
        newCard.querySelector(".card__title").innerText = title
        if (addListeners) {
            this.connectAllListeners(newCard)
        }
        document.querySelector(".cards-grid").append(newCard)
    }

    onloadCreateCards(cardsArray) {
        for (const card of cardsArray) {
            this.createNewCard(card.name, card.link, false)
        }
    }

    onloadConnectListeners() {
        for (let card of document.querySelectorAll(".card")) {
            this.connectAllListeners(card)
        }
    }

    connectLikeListener(cardNode) {
        cardNode.querySelector(".card__like-btn").addEventListener("click", (ev) => {
            ev.currentTarget.classList.toggle("card__like-btn_active")
        })
    }

    connectDelListener(cardNode) {
        cardNode.querySelector(".card__delete-btn").addEventListener("click", (ev) => {
            ev.currentTarget.closest(".card").remove()
        })
    }

    connectImageListener(cardNode) {
        cardNode.querySelector(".card__image").addEventListener("click", (ev) => {
            const caption = ev.currentTarget.closest(".card").querySelector(".card__caption").innerText;
            const imageUrl = ev.currentTarget.src;
            const imagePopup = new ImagePopup();
            imagePopup.setFigure(imageUrl, caption);
            imagePopup.open()
        })
    }

    connectAllListeners(cardNode) {
        this.connectLikeListener(cardNode);
        this.connectDelListener(cardNode);
        this.connectImageListener(cardNode);
    }
}


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
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
const profile = new Profile();
const editForm = new EditForm(".popup_type_edit");
const addForm = new AddForm(".popup_type_add");
const cards = new Cards();
cards.onloadCreateCards(initialCards);
cards.onloadConnectListeners()
