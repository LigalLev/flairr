
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'gig'
const BASE_URL = 'gig/'

export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg,
    getImgUrl,
    getDefaultFilter
}
window.cs = gigService


async function query() {
    const filterKeysValues = window.location.search
    const urlParams = new URLSearchParams(filterKeysValues)
    const filterBy = {
        txt: urlParams.get('txt'),
        category: urlParams.get('category'),
        tag: urlParams.get('tag'),
        minPrice: urlParams.get('minPrice'),
        maxPrice: urlParams.get('maxPrice'),
        languages: urlParams.has('languages') ? JSON.parse(urlParams.get('languages')) : [],
        daysToMake: urlParams.get('daysToMake')
    }
    return httpService.get(BASE_URL, filterBy)
}

function getById(gigId) {
    console.log(':gigId', gigId )
    return httpService.get(BASE_URL + gigId)
}

async function remove(gigId) {
    return httpService.delete(BASE_URL + gigId)
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


function getDefaultFilter() {
    return { txt: '', category: '', price: 0 }
}


function getImgUrl(imgUrl) {
    const tempUrl = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    if (imgUrl) return imgUrl
    return tempUrl

}

function getEmptyGig() {
    const user = userService.getLoggedinUser()
    return {
        title: '',
        description: '',
        imgUrls: [],
        category: '',
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
