
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'gig'

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg,
    getImgUrl
}
window.cs = gigService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(gigId) {
    return httpService.get(`gig/${gigId}`)
}

async function remove(gigId) {
    return httpService.delete(`gig/${gigId}`)
}
async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await httpService.put(`gig/${gig._id}`, gig)

    } else {
        savedGig = await httpService.post('gig', gig)
    }
    return savedGig
}

async function addGigMsg(gigId, txt) {
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, { txt })
    return savedMsg
}


function getEmptyGig() {
    return {
        _id: '',
        title: '',
        description: '',
        imgUrls: [],
        owner: {
            "_id": '',
            "fullname": '',
            "imgUrl": '',
            "level": '',
            "rate": ''
        },
        tags: [],
        likedByUsers: [],

        packages: {
            basic: {
                price: '',
                daysToMake: '',
                included: []
            },
            standard: {
                price: '',
                daysToMake: '',
                included: []
            },
            premium: {
                price: '',
                daysToMake: '',
                included: []
            }
        }
    }
}





function getImgUrl(imgUrl) {
    const tempUrl = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    if (imgUrl) return imgUrl
    return tempUrl

}