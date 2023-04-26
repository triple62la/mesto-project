"use strict";

import {initialCards, onloadCreateCards} from "./components/card.js";
import {enableValidation, cssClasses} from "./components/validation.js";
import {connectModalListeners} from "./components/modal.js";
import './pages/index.css';

connectModalListeners()
enableValidation(cssClasses)
onloadCreateCards(initialCards);

