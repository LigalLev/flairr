
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'gig'
_createGigs()
export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg
}
window.cs = gigService


async function query(filterBy = { title: '', price: 0 }) {
    var gigs = await storageService.query(STORAGE_KEY)
    // if (filterBy.title) {
    //     const regex = new RegExp(filterBy.title, 'i')
    //     gigs = gigs.filter(gig => regex.test(gig.title))
    // }
    // if (filterBy.price) {
    //     gigs = gigs.filter(gig => gig.price <= filterBy.price)
    // }
    return gigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await storageService.put(STORAGE_KEY, gig)
    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        savedGig = await storageService.post(STORAGE_KEY, gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    // Later, this is all done by the backend
    const gig = await getById(gigId)
    if (!gig.msgs) gig.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    gig.msgs.push(msg)
    await storageService.put(STORAGE_KEY, gig)

    return msg
}

function getEmptyGig() {
    return {
            _id: "i101",
            title: "I will design your logo",
            price: 12,
            owner: {
              "_id": "u101",
              "fullname": "Dudu Da",
              "imgUrl": "url",
              "level": "basic/premium",
              "rate": 4
            },
            daysToMake: 3,
            description: "Make unique logo...",
            imgUrl: "",
            tags: [
              "logo-design",
              "artisitic",
              "proffesional",
              "accessible"
            ],
            likedByUsers: ['mini-user'] 
            }
    }

    function _createGigs(){
       let gigs = utilService.loadFromStorage(STORAGE_KEY)
        if (!gigs || !gigs.length)
        gigs = [{
            _id: "i101",
            title: "I will design your logo",
            price: 12,
            owner: {
              "_id": "u101",
              "fullname": "Dudu Da",
              "imgUrl": "url",
              "level": "basic/premium",
              "rate": 4
            },
            daysToMake: 3,
            description: "Make unique logo...",
            imgUrl: "",
            tags: [
              "logo-design",
              "artisitic",
              "proffesional",
              "accessible"
            ],
            likedByUsers: ['mini-user'] 
            },

            {
                _id: "i102",
                title: "I will design your app",
                price: 12,
                owner: {
                  "_id": "u101",
                  "fullname": "Dudu Da",
                  "imgUrl": "url",
                  "level": "basic/premium",
                  "rate": 4
                },
                daysToMake: 3,
                description: "Make unique logo...",
                imgUrl: "",
                tags: [
                  "voice-over",
                  "artisitic",
                  "proffesional",
                  "accessible"
                ],
                likedByUsers: ['mini-user'] 
                }
        ]
        utilService.saveToStorage(STORAGE_KEY, gigs)

    }



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




