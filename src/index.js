"use strict";

import {createNewCard} from "./components/card.js";
import {enableValidation, cssClasses, resetValidationErrors, btnSetDisabled} from "./components/validation.js";
import {closePopup, openPopup} from "./components/modal.js";
import './pages/index.css';
import {
    addBtn, addForm,
    addPopup, addSbmtBtn, avatarForm, avatarImage, avatarInput, avatarModal, avatarOverlay, avatarSbmtBtn,
    cardsGrid,
    descriptionInput,
    editBtn, editForm,
    editPopup, editSubmtBtn, imageUrl,
    nameInput, placeTitle, popupCloseBtns,
    profileDescription,
    profileName
} from "./components/utils";
import {addNewCard, getCards, getUserInfo, setUserInfo, updateAvatar} from "./components/api";



function loadResources(){
    return Promise.all([getUserInfo(), getCards()])
}


function onloadCreateCards(cardsArray, userID) {
    for (const card of cardsArray) {
        const trash = userID === card?.owner?.["_id"] ?? false
        const liked = isLikedByUser(card, userID)
        const cardNode = createNewCard( card,{ trash, liked} );
        cardsGrid.append(cardNode);
    }
}

function isLikedByUser(cardObj,userId){
    for (const like of cardObj.likes){
        if (like["_id"] === userId){
            return true
        }
    }
    return false
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
                closePopup(editPopup);
            })
            .catch((reason)=>{
                console.error(reason)
            })
            .finally(()=>editSubmtBtn.innerText = "Сохранить")
    });

    addPopup.addEventListener("submit", (evnt) => {
        evnt.preventDefault();
        const [name, link] = [placeTitle.value, imageUrl.value]
        addSbmtBtn.innerText = "Создание..."
        addNewCard(name, link)
            .then((response)=>{
                const cardNode = createNewCard(response, {trash : true, liked: false});
                cardsGrid.prepend(cardNode);
                addSbmtBtn.innerText = "Создать"
                addForm.reset()
                closePopup(addPopup)
            })
            .catch(reason=>{
                console.error(reason)
            })
            .finally(()=>addSbmtBtn.innerText = "Создать")
    });


    addBtn.addEventListener("click", () => {

        addForm.reset()
        resetValidationErrors(addPopup, cssClasses)
        btnSetDisabled(addSbmtBtn, true, cssClasses)
        openPopup(addPopup)

    });
    avatarOverlay.addEventListener("click", ()=>openPopup(avatarModal))
    avatarForm.addEventListener("submit", (evt)=>{
        evt.preventDefault()
        const url = avatarInput.value
        avatarSbmtBtn.innerText = "Сохранение..."
        updateAvatar(url)
            .then(()=>{
                avatarSbmtBtn.innerText = "Сохранить"
                avatarImage.src = url
                closePopup(avatarModal)
        })
            .catch(reason => {
                console.error(reason)
            })
            .finally(()=> avatarSbmtBtn.innerText = "Сохранить")
    })
}
function renderUserInfo(name, about){
    profileName.innerText = name;
    profileDescription.innerText = about;

}


loadResources()
    .then((results)=>{
        const [userInfo, cardsArray] = results
        onloadCreateCards(cardsArray, userInfo["_id"])
        renderUserInfo(userInfo.name, userInfo.about)
        avatarImage.src = userInfo.avatar
        connectListeners()
        enableValidation(cssClasses)
})
    .catch(reason=>console.error(`Ошибка загрузки ресурсов с сервера: ${reason}`))