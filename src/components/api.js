

const config  = {
    authToken : "77cf61ee-9369-4f48-993e-65ce51ba58da",
    groupId : "plus-cohort-23",
    baseUrl: "https://nomoreparties.co/v1/" + this.groupId
}

async function request(method, route, payload=null) {
    const init = {
        method,
        headers: {
            authorization: config.authToken,
            "Content-Type": 'application/json;charset=utf-8'
        },
        body: payload? JSON.stringify(payload) : payload
    }
    if (method.toLowerCase() === "get") {
        delete init.body
    }

    const response = await fetch(config.baseUrl +  route, init);
    if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
    }
    return await response.json()
}

function getUserInfo(){
    return  request("GET", "/users/me")
}
function getCards(){
    return request("GET", "/cards ")
}
function setUserInfo(name, about){
    return request("PATCH", "/users/me", {name, about})
}
function addNewCard(name, link){
    // {
    //     "likes": [],
    //     "_id": "5d1f0611d321eb4bdcd707dd",
    //     "name": "Байкал",
    //     "link": "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    //     "owner": {
    //     "name": "Jacques Cousteau",
    //         "about": "Sailor, researcher",
    //         "avatar": "https://pictures.s3.yandex.net/frontend-developer/ava.jpg",
    //         "_id": "ef5f7423f7f5e22bef4ad607",
    //         "cohort": "local"
    // },
    //     "createdAt": "2019-07-05T08:10:57.741Z"
    // }
    return request("POST", "/cards", {name, link})

}
export {getUserInfo, getCards, setUserInfo, addNewCard}
