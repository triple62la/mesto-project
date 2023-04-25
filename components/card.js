import {cardsGrid, cardTemplate, imagePopup} from "./utils.js";
import {openPopup, setPopupFigure} from "./modal.js";

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

function connectAllListeners(cardNode) {
    connectLikeListener(cardNode);
    connectDelListener(cardNode);
    connectImageListener(cardNode);
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
function onloadCreateCards(cardsArray) {
    for (const card of cardsArray) {
        const cardNode = createNewCard(card.name, card.link, true);
        cardsGrid.append(cardNode);
    }
}

export {initialCards, createNewCard, connectAllListeners, onloadCreateCards}