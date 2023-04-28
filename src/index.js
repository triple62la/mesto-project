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
import {addNewCard, getCards, getUserInfo, setUserInfo} from "./components/api";


let CARDS; //храним массив с карточками


function loadResources(){
    return Promise.all([getUserInfo(), getCards()])
}


function onloadCreateCards(cardsArray, userID) {
    for (const card of cardsArray) {
        const trash = userID === card?.owner?.["_id"] ?? false
        const cardNode = createNewCard(card.name, card.link, true, trash);
        cardsGrid.append(cardNode);
    }
}

function connectListeners(){
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
        const name = nameInput.value
        const about = descriptionInput.value
        editSubmtBtn.innerText = "Сохранение..."
        setUserInfo(name, about)
            .then(()=>{
                renderUserInfo(name, about)
                editSubmtBtn.innerText = "Сохранить"
                closePopup(editPopup);
            })
            .catch((reason)=>{
                console.error(reason)
                editSubmtBtn.innerText = "Сохранить"
            })
    });

    addPopup.addEventListener("submit", (evnt) => {
        evnt.preventDefault();
        const [name, link] = [placeTitle.value, imageUrl.value]
        addNewCard(name, link)
            .then(()=>{
                const cardNode = createNewCard(name, link, true, true);
                cardsGrid.prepend(cardNode);
                addForm.reset()
            })
            .catch(reason=>{
                console.error(reason)
            })
    });


    addBtn.addEventListener("click", () => {

        addForm.reset()
        resetValidationErrors(addPopup, cssClasses)
        btnSetDisabled(addSbmtBtn, true, cssClasses)
        openPopup(addPopup)

    });
}
function renderUserInfo(name, about){
    profileName.innerText = name;
    profileDescription.innerText = about;
}



// onloadCreateCards(initialCards);

loadResources().then((results)=>{
    const [userInfo, cardsArray] = results
    onloadCreateCards(cardsArray, userInfo["_id"])
    renderUserInfo(userInfo.name, userInfo.about)
    connectListeners()
    enableValidation(cssClasses)
})