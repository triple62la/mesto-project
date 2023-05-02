import {cardTemplate, figureCaption, figureImage, imagePopup} from "./utils.js";
import {openPopup} from "./modal.js";
import {deleteCard, putCardLike, rmvCardLike} from "./api";
import {resetValidationErrors} from "./validation";


function createNewCard(cardObject, options = {addListeners: true, trash: true, liked: false}) {
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

    connectLikeListener(newCard);
    connectDelListener(newCard);
    connectImageListener(newCard, link, name);

    if (!options.trash) {
        newCard.querySelector(".card__delete-btn").remove()
    }
    return newCard
}


function connectLikeListener(cardNode) {
    cardNode.querySelector(".card__like-btn").addEventListener("click", (ev) => {
        const btn = cardNode.querySelector(".card__like-btn")
        const cardId = cardNode.dataset.cardId
        const likeSpan = cardNode.querySelector(".card__like-counter")
        if (btn.classList.contains("card__like-btn_active")) {
            rmvCardLike(cardId)
                .then((response) => {
                    btn.classList.remove("card__like-btn_active")
                    likeSpan.innerText = response.likes.length
                })
                .catch(reason => console.error(reason))
        } else {
            putCardLike(cardId)
                .then((response) => {
                    btn.classList.add("card__like-btn_active")
                    likeSpan.innerText = response.likes.length
                })
                .catch(reason => console.error(reason))
        }

    })
}

function connectDelListener(cardNode) {
    cardNode.querySelector(".card__delete-btn").addEventListener("click", (ev) => {
        deleteCard(cardNode.dataset.cardId)
            .then(()=>cardNode.remove())
            .catch(reason => console.error(reason))
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