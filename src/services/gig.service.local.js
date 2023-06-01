
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
// const cloudeName = dlhjvt9b4
// const uploadpreset = iulx4g8a

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
        price: 60,
        owner: {
          "_id": "u101",
          "fullname": "nadia_younus",
          "imgUrl": "",
          "level": "Fairr's choice",
          "rate": 5.0
        },
        daysToMake: 3,
        description: "About this gig Hello, I am Kris. Welcome to my logo design gig. I specialize in business logo design. My design will be clean, trendy, minimal and original.I have successfully designed logos for many brands and now I am here on Fiverr to give the best. Why Me? Original, minimal, unique, high quality logo designs Premium customer support 24 x 7 Unlimited revisions, until you are satisfied All types of vector and source files .AI, JPEG, .PNG, PDF, EPS in high resolution WORKFLOW Precise and Strong Communication - Research on current trend - Sketching the initial concepts and Digitalizing it - Submission for Review - Modifications for making the design perfect Minimalist Logo | Minimal | Professional | Modern | Text | Vintage | Badge | Hand drawn | Feminine | Signature | Custom | Watercolor | YouTube Channel | Beauty Customer satisfaction is my top-notch priority and I believe in providing my customer with smooth and comfortable journey on Fiverr. Sounds interesting?? Lets chat!!!Order a gig now and lets have the ball rolling!!!!",
        imgUrl: [],
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
            price: 60,
            owner: {
              "_id": "u101",
              "fullname": "nadia_younus",
              "imgUrl": "",
              "level": "Fiar's choise",
              "rate": 5.0
            },
            daysToMake: 3,
            description: "About this gig Hello, I am Kris. Welcome to my logo design gig. I specialize in business logo design. My design will be clean, trendy, minimal and original.I have successfully designed logos for many brands and now I am here on Fiverr to give the best. Why Me? Original, minimal, unique, high quality logo designs Premium customer support 24 x 7 Unlimited revisions, until you are satisfied All types of vector and source files .AI, JPEG, .PNG, PDF, EPS in high resolution WORKFLOW Precise and Strong Communication - Research on current trend - Sketching the initial concepts and Digitalizing it - Submission for Review - Modifications for making the design perfect Minimalist Logo | Minimal | Professional | Modern | Text | Vintage | Badge | Hand drawn | Feminine | Signature | Custom | Watercolor | YouTube Channel | Beauty Customer satisfaction is my top-notch priority and I believe in providing my customer with smooth and comfortable journey on Fiverr. Sounds interesting?? Lets chat!!!Order a gig now and lets have the ball rolling!!!!",
            imgUrl: [],
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
                title: "I will do 3 modern minimalist logo design for your business",
                price: 20,
                owner: {
                  "_id": "u102",
                  "fullname": "morningdesigns",
                  "imgUrl": "",
                  "level": "Top rated",
                  "rate": 4.9
                },
                daysToMake: 3,
                description: "About this gig Hello, I am Kris. Welcome to my logo design gig. I specialize in business logo design. My design will be clean, trendy, minimal and original. I have successfully designed logos for many brands and now I am here on Fiverr to give the best. Why Me? Original, minimal, unique, high quality logo designs Premium customer support 24 x 7 Unlimited revisions, until you are satisfied All types of vector and source files .AI, JPEG, .PNG, PDF, EPS in high resolution WORKFLOW Precise and Strong Communication - Research on current trend - Sketching the initial concepts and Digitalizing it - Submission for Review - Modifications for making the design perfect Minimalist Logo | Minimal | Professional | Modern | Text | Vintage | Badge | Hand drawn | Feminine | Signature | Custom | Watercolor | YouTube Channel | Beauty Customer satisfaction is my top-notch priority and I believe in providing my customer with smooth and comfortable journey on Fiverr. Sounds interesting?? Lets chat!!! Order a gig now and lets have the ball rolling!!!!",
                imgUrl: ["https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607951/gigs/sdqw13xszcr5ygmsmcwx.png"],
                tags: [
                  "Minimalist",
                ],
                likedByUsers: ['mini-user'] 
                },
            {
                _id: "i103",
                title: "I will design modern and amazing logo for your business",
                price: 20,
                owner: {
                  "_id": "u103",
                  "fullname": "best_designer89",
                  "imgUrl": "url",
                  "level": "Level 2",
                  "rate": 4.8
                },
                daysToMake: 3,
                description: "About this gig Start Your Business with a Perfect Logo Design Our team of concept driven professionals works tirelessly to deliver amazing designs that are visually pleasing to the eyes. The professional logo design process plays a significant role in the development of logo and other visual content. Breaking down the entire project into smaller, manageable chunks helps architects, thinkers, and artists approach their tasks with utmost clarity and creativity. What can you get in my gig Original and Unique designs 3D Mockup Source/Vector Files Social Media Kit Logo Transparency Stationery Designs FREE Consultation 24 X 7 VIP support copyrights Our designing services help you get the best leaving the competition in the backyard and zip through the market of logo design companies. Have queries? Contact us in inbox anytime!",
                imgUrl:[],
                tags: [
                  "Minimalist",
                ],
                likedByUsers: ['mini-user'] 
                },
            {
                _id: "i104",
                title: "I will design professional perfect minimalist logo design",
                price: 20,
                owner: {
                  "_id": "u104",
                  "fullname": "mariya_logo99",
                  "imgUrl": "",
                  "level": "",
                  "rate": 4.9
                },
                daysToMake: 3,
                description: "About this gig Hello, Welcome to my custom creative logo design gig! I have the superpowers to convert idea's/Sketches into a creative logo. I have the expertise in creating custom, premium, and high-quality logos. I focus on creating simple yet innovative designs that will highly impact the customer's mind. Advantages of working with me: * Get ultimate ideas and unique options to choose the best design. * TOP NOTCH quality will be provided * Multiple revisions * Custom graphics. * Fast delivery with VIP support. * All Copyrights. My Expertise includes: Company Logo | | Professional | Premium | Luxury | Versatile | Minimalist | Modern | Custom | Clean | Vintage | Retro | Badge | Hand drawn | Feminine | Flat | Signature | Business Logos and many more. NOTE: MASCOTS AND DETAILED DESIGNS ARE NOT INCLUDED IN THESE PACKAGES. Lets convert your dreams into a vector design. *** ORDER NOW***",
                imgUrl: [],
                tags: [
                  "Minimalist",
                ],
                likedByUsers: ['mini-user'] 
                },
            {
                _id: "i105",
                title: "I will draw a unique logo for your enterprise",
                price: 20,
                owner: {
                  "_id": "u105",
                  "fullname": "websutra",
                  "imgUrl":"",
                  "level": "pro",
                  "rate": 4.9
                },
                daysToMake: 3,
                description: "About this gig Looking for a unique logo concept for your enterprise? WebSutra is a dedicated team which focused on providing unique logo designs based on your branding requirements. We are specialised in minimal logo designs & branding projects which offer complete visual identity developments for enterprises. With 10 years of experience, over 400 projects completed on Fiverr and with over 200 5-star reviews, We will ensure, our unique branding graphics and logo designs will clearly convey your enterprise presence through the design of a quality modern logo and a colour scheme. What will you get? Unique custom made logo that will represent your business Profile picture and header for your social media profiles Stationary design like business card, letterhead and envelope 3D mockups Branding book for your business Transfer of Copyrights Document Please check all our packages and select the one that best suits your budget and requirements. If you have any questions, feel free to message us anytime. We are always happy to help. Thank You!",
                imgUrl: [],
                tags: [
                  "Minimalist",
                ],
                likedByUsers: ['mini-user'] 
                }
        ]
        utilService.saveToStorage(STORAGE_KEY, gigs)

    }



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




