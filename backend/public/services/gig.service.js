
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'



export const gigService = {
    query,
    getById,
    save,
    remove,
    getEmptyGig,
    addGigMsg
}
window.cs = gigService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get('gig', filterBy)
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
    const savedMsg = await httpService.post(`gig/${gigId}/msg`, {txt})
    return savedMsg
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


    const orders = [
        {
          "_id": "o1225",
          "buyer": "mini-user",
          "seller": "mini-user",
          "gig": {
            "_id": "i101",
            "name": "Design Logo",
            "price": 20
          },
          "status": "pending"
        }
      ]





