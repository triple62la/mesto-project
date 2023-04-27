"use strict";

import {createNewCard} from "./components/card.js";
import {enableValidation, cssClasses, resetValidationErrors, btnSetDisabled} from "./components/validation.js";
import {closePopup, openPopup} from "./components/modal.js";
import './pages/index.css';
import {
    addBtn,
    addPopup,
    cardsGrid,
    descriptionInput,
    editBtn,
    editPopup, imageUrl,
    nameInput, placeTitle, popupCloseBtns,
    profileDescription,
    profileName
} from "./components/utils";
import initialCards from "./components/cards";

function onloadCreateCards(cardsArray) {
    for (const card of cardsArray) {
        const cardNode = createNewCard(card.name, card.link, true);
        cardsGrid.append(cardNode);
    }
}


popupCloseBtns.map((btn) => btn.addEventListener("click", () => {
    const popup = btn.closest(".popup")
    closePopup(popup)
    popup.querySelector(".form").reset()

}));

editBtn.addEventListener("click", () => {

    const form = editPopup.querySelector(".form")
    const btn = form.querySelector("."+cssClasses.submitButton)
    nameInput.value = profileName.innerText;
    descriptionInput.value = profileDescription.innerText;
    resetValidationErrors(form, cssClasses)
    btnSetDisabled(btn, false, cssClasses)
    openPopup(editPopup)
});

editPopup.addEventListener("submit", (evnt) => {
    evnt.preventDefault();
    profileName.innerText = nameInput.value;
    profileDescription.innerText = descriptionInput.value;
    closePopup(editPopup);
});

addPopup.addEventListener("submit", (evnt) => {
    evnt.preventDefault();
    const cardNode = createNewCard(placeTitle.value, imageUrl.value);
    cardsGrid.prepend(cardNode);
    evnt.target.reset();
    closePopup(addPopup);
});


addBtn.addEventListener("click", () => {

    const form = addPopup.querySelector(".form")
    const btn = form.querySelector("."+cssClasses.submitButton)
    resetValidationErrors(addPopup, cssClasses)
    btnSetDisabled(btn, true, cssClasses)
    openPopup(addPopup)

});


enableValidation(cssClasses)
onloadCreateCards(initialCards);

