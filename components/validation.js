

function hasInvalidInput(form){
    return [...form.querySelectorAll(".form__input")].some((input)=>{
        return !input.validity.valid
    })
}

function resetValidationErrors(form){
    const errors = [...form.querySelectorAll(".form__error")]
    const inputs = [...form.querySelectorAll(".form__input")]
    errors.map(error=>error.innerText="")
    inputs.map(input=>input.classList.remove("form__input_invalid"))
    const state = form.name === "add-place"
    btnSetDisabled(form.querySelector(".form__submit-btn"), state)
}

function renderValidation(input, form){

    const  msg = input.validity.patternMismatch? input.dataset.errorMessage: input.validationMessage;
    const formisValid = !hasInvalidInput(form)
    const btn = form.querySelector(".form__submit-btn")
    setInputError(form, input, msg)
    btnSetDisabled(btn, !formisValid)
}

function connectValidationListeners(){

    for (const form of [...document.querySelectorAll(".form")]){

        for (const input of [...form.querySelectorAll(".form__input")]){

            input.addEventListener("input", (evt)=>{
                const form = evt.target.closest(".form")
                renderValidation(input, form)
            })
        }
    }
}

function setInputError(form, input, msg){

    const errorSpan = form.querySelector(`.form__error_type_${input.id}`)
    errorSpan.innerText = msg
    if (msg){
        input.classList.add("form__input_invalid")
    } else {
        input.classList.remove("form__input_invalid")
    }
}

function btnSetDisabled(btn, state){
    if (state) {
        btn.classList.add("form__submit-btn_disabled")
    } else {
        btn.classList.remove("form__submit-btn_disabled")
    }
}
export {resetValidationErrors, connectValidationListeners}