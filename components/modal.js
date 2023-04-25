import {
    addBtn,
    addForm,
    cardsGrid,
    descriptionInput,
    editBtn,
    editForm, figureCaption, figureImage, imageUrl,
    nameInput, placeTitle, popupCloseBtns,
    profileDescription,
    profileName
} from "./utils.js";

import {resetValidationErrors} from "./validation.js";

import {createNewCard} from "./card.js";

function openPopup(node) {
    node.classList.add("popup_opened");
    node.addEventListener("click", overlayOnClick)
    document.addEventListener("keydown", onEscCloseOverlay)
    const form = node.querySelector(".form")
    if (form) {
        resetValidationErrors(form)
        form.reset()
    }
}

function closePopup(node) {
    node.classList.remove("popup_opened");
    node.removeEventListener("click", overlayOnClick)
    document.removeEventListener("keydown", onEscCloseOverlay)
}

function connectCloseListener(closeBtn) {
    closeBtn.addEventListener("click", () => closePopup(closeBtn.closest(".popup")))

}

function overlayOnClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

function onEscCloseOverlay(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector(".popup_opened"))
    }
}

function setPopupFigure(imageUrl, caption) {

    figureImage.src = imageUrl;
    figureImage.alt = caption;
    figureCaption.innerText = caption;
}

const openEditForm = () => {
    openPopup(editForm)
    nameInput.value = profileName.innerText;
    descriptionInput.value = profileDescription.innerText;

};

function connectModalListeners() {

    editBtn.addEventListener("click", () => openEditForm());
    editForm.addEventListener("submit", (evnt) => {
        evnt.preventDefault();
        profileName.innerText = nameInput.value;
        profileDescription.innerText = descriptionInput.value;
        closePopup(editForm);
    });
    addForm.addEventListener("submit", (evnt) => {
        evnt.preventDefault();
        const cardNode = createNewCard(placeTitle.value, imageUrl.value);
        cardsGrid.prepend(cardNode);
        evnt.target.reset();
        closePopup(addForm);
    });

    addBtn.addEventListener("click", () => openPopup(addForm));
    popupCloseBtns.map((btn) => connectCloseListener(btn));
}


export {
    setPopupFigure,
    openPopup,
    closePopup,
    onEscCloseOverlay,
    overlayOnClick,
    openEditForm,
    connectCloseListener,
    connectModalListeners
}