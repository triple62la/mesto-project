function openPopup(node) {
    node.classList.add("popup_opened");
    node.addEventListener("click", overlayOnClick)
    document.addEventListener("keydown", onEscCloseOverlay)


}

function closePopup(node) {
    node.classList.remove("popup_opened");
    node.removeEventListener("click", overlayOnClick)
    document.removeEventListener("keydown", onEscCloseOverlay)
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


export {
    openPopup,
    closePopup,
    overlayOnClick,
}