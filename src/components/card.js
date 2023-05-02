import {cardTemplate, figureCaption, figureImage, imagePopup} from "./utils.js";
import {openPopup} from "./modal.js";
import {deleteCard, putCardLike, rmvCardLike} from "./api";
import {resetValidationErrors} from "./validation";


function createNewCard(cardObject, options =  {trash: true, liked: false}) {
    const {name, link, likes, _id} = cardObject
    const newCard = cardTemplate.content
        .cloneNode(true)
        .querySelector(".card");
    const image = newCard.querySelector(".card__image");
    const likesSpan = newCard.querySelector(".card__like-counter")
    const likeBtn = newCard.querySelector(".card__like-btn")
    options.liked ? likeBtn.classList.add("card__like-btn_active") : likeBtn.classList.remove("card__like-btn_active")
    likesSpan.innerText = likes.length
    image.src = link;
    image.alt = "Изображение для " + name;
    newCard.querySelector(".card__title").innerText = name;
    newCard.dataset.cardId = _id
    if (!options.trash) {
        newCard.querySelector(".card__delete-btn").remove()
    }
    return newCard
}




export {createNewCard}