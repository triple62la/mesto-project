import {cardTemplate, figureCaption, figureImage, imagePopup} from "./utils.js";
import {openPopup} from "./modal.js";


function createNewCard(title, url, addListeners = true) {
    const newCard = cardTemplate.content.cloneNode(true);
    const image = newCard.querySelector(".card__image");
    image.src = url;
    image.alt = "Изображение для " + title;
    newCard.querySelector(".card__title").innerText = title;
    if (addListeners) {
        connectLikeListener(newCard);
        connectDelListener(newCard);
        connectImageListener(newCard, url, title);
    }
    return newCard
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

function connectImageListener(cardNode, imageUrl, caption) {
    cardNode.querySelector(".card__image").addEventListener("click", (ev) => {
        // const caption = ev.currentTarget.closest(".card").querySelector(".card__caption").innerText;
        // const imageUrl = ev.currentTarget.src;
        figureImage.src = imageUrl;
        figureImage.alt = caption;
        figureCaption.innerText = caption;
        openPopup(imagePopup);
    })
}


export {createNewCard}