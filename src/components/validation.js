import {forms} from "./utils";

export const cssClasses = {
    form: 'form',
    input: 'form__input',
    invalidInput: "form__input_invalid",
    submitButton: 'form__submit-btn',
    disabledButton: 'form__submit-btn_disabled',
    inputError: 'form__input_invalid',
    errorSpan: 'form__error'
}

function hasInvalidInput(form, classes) {
    return [...form.querySelectorAll("."+ classes.input)].some((input) => {
        return !input.validity.valid
    })
}

function resetValidationErrors(form, classes) {
    const errors = [...form.querySelectorAll("." + classes.errorSpanClass)]
    const inputs = [...form.querySelectorAll("." + classes.input)]
    const btn = form.querySelector("."+classes.submitButton)
    errors.map(error => error.innerText = "")
    inputs.map(input => input.classList.remove(classes.invalidInput))
    const state = form.name === "add-place"
    btnSetDisabled(btn, state, classes)
}

function renderValidation(input, form, classes) {

    const msg = input.validity.patternMismatch ? input.dataset.errorMessage : input.validationMessage;
    const formisValid = !hasInvalidInput(form, classes)
    const btn = form.querySelector("." + classes.submitButton)
    setInputError(form, input, msg, classes)
    btnSetDisabled(btn, !formisValid, classes)
}

function enableValidation(classes) {

    for (const form of forms) {

        for (const input of [...form.querySelectorAll("."+ classes.input)]) {

            input.addEventListener("input", (evt) => {
                const form = evt.target.closest("."+ classes.form)
                renderValidation(input, form, classes)
            })
        }
    }
}

function setInputError(form, input, msg, classes) {

    const errorSpan = form.querySelector(`.form__error_type_${input.id}`)
    errorSpan.innerText = msg
    if (msg) {
        input.classList.add(classes.invalidInput)
    } else {
        input.classList.remove(classes.invalidInput)
    }
}

function btnSetDisabled(btn, state, classes) {
    if (state) {
        btn.classList.add(classes.disabledButton)
    } else {
        btn.classList.remove(classes.disabledButton)
    }
}

export {resetValidationErrors, enableValidation}