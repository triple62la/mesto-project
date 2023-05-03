/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";function t(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,r){if(t){if("string"==typeof t)return e(t,r);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?e(t,r):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var r=document.querySelector(".profile__name-text"),n=document.querySelector(".profile__description"),o=document.querySelector("#name-input"),i=document.querySelector("#description-input"),a=document.querySelector(".popup_type_edit"),c=document.querySelector(".profile__edit-btn"),u=document.querySelector(".popup_type_add"),l=document.querySelector("#place-title"),f=document.querySelector("#image-url"),s=document.querySelector(".popup_type_image"),d=document.querySelector(".profile__add-btn"),y=document.querySelector("#card-template"),p=document.querySelector(".cards-grid"),v=s.querySelector(".figure__image"),h=s.querySelector(".figure__caption"),m=t(document.querySelectorAll(".popup__close-btn")),b=t(document.forms),g=u.querySelector(".form"),_=a.querySelector(".form"),S=_.querySelector(".form__submit-btn"),w=g.querySelector(".form__submit-btn"),L=document.querySelector(".profile__avatar-overlay"),x=document.querySelector(".profile__avatar-img"),E=document.querySelector(".popup_type_avatar"),k=E.querySelector(".form"),q=k.querySelector(".form__submit-btn"),T=k.querySelector("#avatar-url");function A(t){t.classList.add("popup_opened"),t.addEventListener("click",I),document.addEventListener("keydown",O)}function j(t){t.classList.remove("popup_opened"),t.removeEventListener("click",I),document.removeEventListener("keydown",O)}function I(t){t.target===t.currentTarget&&j(t.target)}function O(t){"Escape"===t.key&&j(document.querySelector(".popup_opened"))}function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function G(){G=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var i=e&&e.prototype instanceof d?e:d,a=Object.create(i.prototype),c=new E(o||[]);return n(a,"_invoke",{value:S(t,r,c)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var s={};function d(){}function y(){}function p(){}var v={};u(v,i,(function(){return this}));var h=Object.getPrototypeOf,m=h&&h(h(k([])));m&&m!==e&&r.call(m,i)&&(v=m);var b=p.prototype=d.prototype=Object.create(v);function g(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function o(n,i,a,c){var u=f(t[n],t,i);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==P(s)&&r.call(s,"__await")?e.resolve(s.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(s).then((function(t){l.value=t,a(l)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function S(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=w(a,r);if(c){if(c===s)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===s)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function w(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),s;var o=f(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,s;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,s):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,s)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function k(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:q}}function q(){return{value:void 0,done:!0}}return y.prototype=p,n(b,"constructor",{value:p,configurable:!0}),n(p,"constructor",{value:y,configurable:!0}),y.displayName=u(p,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,u(t,c,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},g(_.prototype),u(_.prototype,a,(function(){return this})),t.AsyncIterator=_,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new _(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},g(b),u(b,c,"Generator"),u(b,i,(function(){return this})),u(b,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=k,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,s):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),s},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),x(r),s}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;x(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:k(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),s}},t}function N(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}var C={authToken:"77cf61ee-9369-4f48-993e-65ce51ba58da",groupId:"plus-cohort-23",get baseUrl(){return"https://nomoreparties.co/v1/"+this.groupId}};function B(t,e){return M.apply(this,arguments)}function M(){var t;return t=G().mark((function t(e,r){var n,o,i,a=arguments;return G().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=a.length>2&&void 0!==a[2]?a[2]:null,o={method:e,headers:{authorization:C.authToken,"Content-Type":"application/json;charset=utf-8"},body:n?JSON.stringify(n):n},"get"===e.toLowerCase()&&delete o.body,t.next=5,fetch(C.baseUrl+r,o);case 5:if((i=t.sent).ok){t.next=8;break}return t.abrupt("return",Promise.reject("Ошибка: ".concat(i.status)));case 8:return t.next=10,i.json();case 10:return t.abrupt("return",t.sent);case 11:case"end":return t.stop()}}),t)})),M=function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){N(i,n,o,a,c,"next",t)}function c(t){N(i,n,o,a,c,"throw",t)}a(void 0)}))},M.apply(this,arguments)}function U(t){var e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{trash:!0,liked:!1},n=t.name,o=t.link,i=t.likes,a=t._id,c=y.content.cloneNode(!0).querySelector(".card"),u=c.querySelector(".card__image"),l=c.querySelector(".card__like-counter"),f=c.querySelector(".card__like-btn");return r.liked?f.classList.add("card__like-btn_active"):f.classList.remove("card__like-btn_active"),l.innerText=0===i.length?" ":i.length,u.src=o,u.alt="Изображение для "+n,c.querySelector(".card__title").innerText=n,c.dataset.cardId=a,(e=c).querySelector(".card__like-btn").addEventListener("click",(function(t){var r=e.querySelector(".card__like-btn"),n=e.dataset.cardId,o=e.querySelector(".card__like-counter");r.classList.contains("card__like-btn_active")?function(t){return B("DELETE","/cards/likes/".concat(t))}(n).then((function(t){r.classList.remove("card__like-btn_active"),o.innerText=0===t.likes.length?"":t.likes.length})).catch((function(t){return console.error(t)})):function(t){return B("PUT","/cards/likes/".concat(t))}(n).then((function(t){r.classList.add("card__like-btn_active"),o.innerText=0===t.likes.length?"":t.likes.length})).catch((function(t){return console.error(t)}))})),function(t){t.querySelector(".card__delete-btn").addEventListener("click",(function(e){var r;(r=t.dataset.cardId,B("DELETE","/cards/".concat(r))).then((function(){return t.remove()})).catch((function(t){return console.error(t)}))}))}(c),function(t,e,r){t.querySelector(".card__image").addEventListener("click",(function(t){v.src=e,v.alt=r,h.innerText=r,A(s)}))}(c,o,n),r.trash||c.querySelector(".card__delete-btn").remove(),c}function D(t){return function(t){if(Array.isArray(t))return $(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||F(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function F(t,e){if(t){if("string"==typeof t)return $(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?$(t,e):void 0}}function $(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}var H={form:"form",input:"form__input",invalidInput:"form__input_invalid",submitButton:"form__submit-btn",disabledButton:"form__submit-btn_disabled",inputError:"form__input_invalid",errorSpan:"form__error"};function Y(t,e){var r=D(t.querySelectorAll("."+e.errorSpan)),n=D(t.querySelectorAll("."+e.input));t.querySelector("."+e.submitButton),r.map((function(t){return t.innerText=""})),n.map((function(t){return t.classList.remove(e.invalidInput)}))}function z(t,e,r){var n=t.validity.patternMismatch?t.dataset.errorMessage:t.validationMessage,o=!function(t,e){return D(t.querySelectorAll("."+e.input)).some((function(t){return!t.validity.valid}))}(e,r),i=e.querySelector("."+r.submitButton);!function(t,e,r,n){t.querySelector(".form__error_type_".concat(e.id)).innerText=r,r?e.classList.add(n.invalidInput):e.classList.remove(n.invalidInput)}(e,t,n,r),J(i,!o,r)}function J(t,e,r){e?t.classList.add(r.disabledButton):t.classList.remove(r.disabledButton)}function K(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=Q(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw i}}}}function Q(t,e){if(t){if("string"==typeof t)return R(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?R(t,e):void 0}}function R(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function V(t,e){var r,n=K(t.likes);try{for(n.s();!(r=n.n()).done;)if(r.value._id===e)return!0}catch(t){n.e(t)}finally{n.f()}return!1}function W(t,e){r.innerText=t,n.innerText=e}Promise.all([B("GET","/users/me"),B("GET","/cards ")]).then((function(t){var e,s,y=(s=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,i,a,c=[],u=!0,l=!1;try{if(i=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=i.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return c}}(e,s)||Q(e,s)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),v=y[0];!function(t,e){var r,n=K(t);try{for(n.s();!(r=n.n()).done;){var o,i,a=r.value,c=U(a,{trash:null!==(o=e===(null==a||null===(i=a.owner)||void 0===i?void 0:i._id))&&void 0!==o&&o,liked:V(a,e)});p.append(c)}}catch(t){n.e(t)}finally{n.f()}}(y[1],v._id),W(v.name,v.about),x.src=v.avatar,m.map((function(t){return t.addEventListener("click",(function(){j(t.closest(".popup"))}))})),c.addEventListener("click",(function(){o.value=r.innerText,i.value=n.innerText,Y(_,H),J(S,!1,H),A(a)})),a.addEventListener("submit",(function(t){t.preventDefault();var e=o.value,r=i.value;S.innerText="Сохранение...",function(t,e){return B("PATCH","/users/me",{name:t,about:e})}(e,r).then((function(){W(e,r),j(a)})).catch((function(t){console.error(t)})).finally((function(){return S.innerText="Сохранить"}))})),u.addEventListener("submit",(function(t){t.preventDefault();var e=[l.value,f.value],r=e[0],n=e[1];w.innerText="Создание...",function(t,e){return B("POST","/cards",{name:t,link:e})}(r,n).then((function(t){var e=U(t,{trash:!0,liked:!1});p.prepend(e),g.reset(),j(u)})).catch((function(t){console.error(t)})).finally((function(){return w.innerText="Создать"}))})),d.addEventListener("click",(function(){g.reset(),Y(u,H),J(w,!0,H),A(u)})),L.addEventListener("click",(function(){k.reset(),Y(k,H),J(q,!0,H),A(E)})),k.addEventListener("submit",(function(t){t.preventDefault();var e,r=T.value;q.innerText="Сохранение...",(e=r,B("PATCH","/users/me/avatar",{avatar:e})).then((function(){x.src=r,k.reset(),j(E)})).catch((function(t){console.error(t)})).finally((function(){return q.innerText="Сохранить"}))})),function(t){var e,r=function(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=F(t))){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return a=t.done,t},e:function(t){c=!0,i=t},f:function(){try{a||null==r.return||r.return()}finally{if(c)throw i}}}}(b);try{for(r.s();!(e=r.n()).done;)for(var n=e.value,o=function(){var e=a[i];e.addEventListener("input",(function(r){var n=r.target.closest("."+t.form);z(e,n,t)}))},i=0,a=D(n.querySelectorAll("."+t.input));i<a.length;i++)o()}catch(t){r.e(t)}finally{r.f()}}(H)})).catch((function(t){return console.error("Ошибка загрузки ресурсов с сервера: ".concat(t))}))})();