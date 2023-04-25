"use strict";

import {initialCards, onloadCreateCards} from "./card.js";
import {connectValidationListeners} from "./validation.js";
import {connectModalListeners} from "./modal.js";


connectModalListeners()
connectValidationListeners()
onloadCreateCards(initialCards);

