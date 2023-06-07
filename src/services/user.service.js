import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service.js'



const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// _createUser()
const GUEST = {
    _id: '0001',
    fullname: 'Guest',
    imgUrl: 'https://res.cloudinary.com/dqhfnvtca/image/upload/v1686055437/flairr/undraw_male_avatar_g98d_nn0ijg.svg',
    level: 'Basic',
    rate: 5
}

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore,
}

window.userService = userService


function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}



async function getById(userId) {
    const user = await storageService.get('user', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id, score }) {
    const user = await storageService.get('user', _id)
    user.score = score
    await storageService.put('user', user)

    // const user = await httpService.put(`user/${_id}`, {_id, score})
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl, username: '', level: 'Basic', reviews: [] }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) || GUEST
}


// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()

function getUser() {
    return [
        {
            _id: "u101",
            fullname: "User 1",
            imgUrl: "/img/img1.jpg",
            username: "user1",
            password: "secret",
            level: "basic/premium",
            reviews: [
                {
                    "id": "madeId",
                    "gig": "{optional-mini-gig}",
                    "txt": "Very kind and works fast",
                    "rate": 4,
                    "by": {
                        "_id": "u102",
                        "fullname": "user2",
                        "imgUrl": "/img/img2.jpg"
                    }
                }
            ],
        },
    ]
}


function _createUser() {
    let user = utilService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    return [
        {
            _id: "seller1",
            fullname: "User 1",
            imgUrl: "/img/img1.jpg",
            username: "user1",
            password: "secret",
            level: "basic/premium",
            reviews: [
                {
                    _id: "review1",
                    gig: "{optional-mini-gig}",
                    txt: "He is a super kind artist. While processing the project he was super professional and only took him 1 shot to deliver a perfect result!",
                    rate: 4,
                    reviewedAt: "1 week ago",
                    byUser: {
                        _id: "buyer1",
                        fullname: 'Anna_brod',
                        imgUrl: "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685460594/cld-sample.jpg",
                        country: 'United state',
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                    }
                },
                {
                    _id: "review2",
                    gig: "{optional-mini-gig}",
                    txt: "It was great to work with. Communication was prompt and clear. All deadlines were met without issue. I will be using them again when I am ready for another project.",
                    rate: 5,
                    reviewedAt: "2 week ago",
                    byUser: {
                        _id: "buyer2",
                        fullname: 'colton_miller',
                        imgUrl: "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685460594/cld-sample.jpg",
                        country: 'United state',
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                    }
                }
            ],
        },
    ]
}
function getEmptyUser() {
    return {
        _id: '',
        fullname: '',
        imgUrl: '',
        username: '',
        password: '',
        level: 'Basic',
        reviews: [],

    }
}
