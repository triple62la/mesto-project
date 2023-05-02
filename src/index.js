"use strict";

import {createNewCard} from "./components/card.js";
import {enableValidation, cssClasses, resetValidationErrors, btnSetDisabled} from "./components/validation.js";
import {closePopup, openPopup} from "./components/modal.js";
import './pages/index.css';
import {
    addBtn, addForm,
    addPopup, addSbmtBtn, avatarForm, avatarImage, avatarInput, avatarModal, avatarOverlay, avatarSbmtBtn,
    cardsGrid, confirmAcceptBtn, confirmDeclineBtn, confirmForm, confirmModal, confirmModalCloseBtn,
    descriptionInput,
    editBtn, editForm,
    editPopup, editSubmtBtn, figureCaption, figureImage, imagePopup, imageUrl,
    nameInput, placeTitle, popupCloseBtns,
    profileDescription,
    profileName
} from "./components/utils";
import {
    addNewCard,
    deleteCard,
    getCards,
    getUserInfo,
    putCardLike,
    rmvCardLike,
    setUserInfo,
    updateAvatar
} from "./components/api";



function loadResources(){
    return Promise.all([getUserInfo(), getCards()])
}


function onloadCreateCards(cardsArray, userID) {
    for (const card of cardsArray) {
        const trash = userID === card?.owner?.["_id"] ?? false
        const liked = isLikedByUser(card, userID)
        const cardNode = createNewCard( card,{ trash, liked} );
        cardsGrid.append(cardNode);
        connectCardListeners(cardNode, card.link, card.name)

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
        addSbmtBtn.innerText = "Создание..."
        addNewCard(name, link)
            .then((response)=>{
                console.log(response)
                const cardNode = createNewCard(response, {trash : true, liked: false});
                connectCardListeners(cardNode, link, name)
                cardsGrid.prepend(cardNode);
                addSbmtBtn.innerText = "Создать"
                addForm.reset()
            })
            .catch(reason=>{
                addSbmtBtn.innerText = "Создать"
                console.error(reason)
            })
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
                avatarSbmtBtn.innerText = "Сохранить"
                console.error(reason)
                closePopup(avatarModal)
            })
    })
}
function renderUserInfo(name, about, avatar){
    profileName.innerText = name;
    profileDescription.innerText = about;
    avatarImage.src = avatar
}

function delBtnClick(evt){

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
    const delBtn = cardNode.querySelector(".card__delete-btn")
    if (!delBtn) return

    delBtn.addEventListener("click", (ev) => {
        openPopup(confirmModal)
        //создаем акцептующий промис
        const accept = new Promise((resolve)=>confirmForm.addEventListener("submit",(evt)=> {
            evt.preventDefault()
            closePopup(confirmModal)
            resolve(true)
        }))
        //создаем отклоняющий промис:
        const decline = new Promise((resolve)=>confirmModalCloseBtn.addEventListener("click", ()=>resolve(false)))
        Promise.race([accept,decline])
            .then(value=>{
                if (value){ //если выиграл акцептующий
                    deleteCard(cardNode.dataset.cardId)
                        .then(()=>cardNode.remove())
                        .catch(reason => console.error(reason))
                }
            })
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

function connectCardListeners(cardNode, imageUrl, title){
    connectLikeListener(cardNode)
    connectDelListener(cardNode)
    connectImageListener(cardNode, imageUrl, title)
}

document.addEventListener("keydown", (evt)=>{
    if (evt.key === "v"){
        const accept = new Promise((resolve)=>confirmForm.addEventListener("submit",(evt)=> {
            evt.preventDefault()
            resolve("Принято")
        }))
        const decline = new Promise((resolve)=>confirmModalCloseBtn.addEventListener("click", ()=>resolve("Отменено")))
        openPopup(confirmModal)
        Promise.race([accept,decline])
            .then(value=>console.log(value))
    }
})

loadResources()
    .then((results)=>{
    const [userInfo, cardsArray] = results
    onloadCreateCards(cardsArray, userInfo["_id"])
    renderUserInfo(userInfo.name, userInfo.about, userInfo.avatar)
    connectListeners()
    enableValidation(cssClasses)
})
    .catch((reason)=>console.error("Ошибка загрузки ресурсов с сервера", reason))