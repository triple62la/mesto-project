"use strict";

import {createNewCard} from "./components/card.js";
import {enableValidation, cssClasses, resetValidationErrors, btnSetDisabled} from "./components/validation.js";
import {closePopup, openPopup} from "./components/modal.js";
import './pages/index.css';
import {
    addBtn, addForm,
    addPopup, addSbmtBtn,
    cardsGrid,
    descriptionInput,
    editBtn, editForm,
    editPopup, editSubmtBtn, imageUrl,
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

}));

editBtn.addEventListener("click", () => {
    nameInput.value = profileName.innerText;
    descriptionInput.value = profileDescription.innerText;
    resetValidationErrors(editForm, cssClasses)
    btnSetDisabled(editSubmtBtn, false, cssClasses)
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
    addForm.reset()
});


addBtn.addEventListener("click", () => {

    addForm.reset()
    resetValidationErrors(addPopup, cssClasses)
    btnSetDisabled(addSbmtBtn, true, cssClasses)
    openPopup(addPopup)

});


enableValidation(cssClasses)
onloadCreateCards(initialCards);

