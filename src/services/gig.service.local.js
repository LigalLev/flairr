
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
        description: "Hello, I am Kris. Welcome to my logo design gig. I specialize in business logo design. My design will be clean, trendy, minimal and original.I have successfully designed logos for many brands and now I am here on Fiverr to give the best. Why Me? Original, minimal, unique, high quality logo designs Premium customer support 24 x 7 Unlimited revisions, until you are satisfied All types of vector and source files .AI, JPEG, .PNG, PDF, EPS in high resolution WORKFLOW Precise and Strong Communication - Research on current trend - Sketching the initial concepts and Digitalizing it - Submission for Review - Modifications for making the design perfect Minimalist Logo | Minimal | Professional | Modern | Text | Vintage | Badge | Hand drawn | Feminine | Signature | Custom | Watercolor | YouTube Channel | Beauty Customer satisfaction is my top-notch priority and I believe in providing my customer with smooth and comfortable journey on Fiverr. Sounds interesting?? Lets chat!!!Order a gig now and lets have the ball rolling!!!!",
        imgUrl: ['https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685611697/gigs/c9dhyxfmh80hbuawemlm.jpg',' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607730/gigs/heyuacvxghfilhbloyay.jpg',' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607711/gigs/utfc8fxcnbhrl2jken2o.jpg',' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607696/gigs/zvysug7d3tdvekqdfms5.jpg'],
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
            title: "I will design modern minimalist elegant logo",
            price: 60,
            owner: {
              "_id": "u101",
              "fullname": "nadia_younus",
              "imgUrl": "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616615/gigs/cy8yt73ihkig5aklntq8.jpg",
              "level": "Fiar's choise",
              "rate": 5.0
            },
            daysToMake: 3,
            description: "Hello, I am Kris. Welcome to my logo design gig. I specialize in business logo design. My design will be clean, trendy, minimal and original.I have successfully designed logos for many brands and now I am here on Fiverr to give the best. Why Me? Original, minimal, unique, high quality logo designs Premium customer support 24 x 7 Unlimited revisions, until you are satisfied All types of vector and source files .AI, JPEG, .PNG, PDF, EPS in high resolution WORKFLOW Precise and Strong Communication - Research on current trend - Sketching the initial concepts and Digitalizing it - Submission for Review - Modifications for making the design perfect Minimalist Logo | Minimal | Professional | Modern | Text | Vintage | Badge | Hand drawn | Feminine | Signature | Custom | Watercolor | YouTube Channel | Beauty Customer satisfaction is my top-notch priority and I believe in providing my customer with smooth and comfortable journey on Fiverr. Sounds interesting?? Lets chat!!!Order a gig now and lets have the ball rolling!!!!",
            imgUrl: ['https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685611697/gigs/c9dhyxfmh80hbuawemlm.jpg',' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607730/gigs/heyuacvxghfilhbloyay.jpg',' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607711/gigs/utfc8fxcnbhrl2jken2o.jpg',' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607696/gigs/zvysug7d3tdvekqdfms5.jpg'],
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
                  "imgUrl": "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616702/gigs/k1a31fmr4v2gnvu4pwe0.png",
                  "level": "Top rated",
                  "rate": 4.9
                },
                daysToMake: 3,
                description: "Hello, I am Kris. Welcome to my logo design gig. I specialize in business logo design. My design will be clean, trendy, minimal and original. I have successfully designed logos for many brands and now I am here on Fiverr to give the best. Why Me? Original, minimal, unique, high quality logo designs Premium customer support 24 x 7 Unlimited revisions, until you are satisfied All types of vector and source files .AI, JPEG, .PNG, PDF, EPS in high resolution WORKFLOW Precise and Strong Communication - Research on current trend - Sketching the initial concepts and Digitalizing it - Submission for Review - Modifications for making the design perfect Minimalist Logo | Minimal | Professional | Modern | Text | Vintage | Badge | Hand drawn | Feminine | Signature | Custom | Watercolor | YouTube Channel | Beauty Customer satisfaction is my top-notch priority and I believe in providing my customer with smooth and comfortable journey on Fiverr. Sounds interesting?? Lets chat!!! Order a gig now and lets have the ball rolling!!!!",
                imgUrl: ["https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607951/gigs/sdqw13xszcr5ygmsmcwx.png", "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607931/gigs/rjvwpryqcforxtabuqfe.png"],
                tags: [
                  "Minimalist",
                ],
                likedByUsers: ['mini-user'] 
                },
            {
                _id: "i103",
                title: "I will design modern and amazing logo for your business",
                price: 15,
                owner: {
                  "_id": "u103",
                  "fullname": "best_designer89",
                  "imgUrl": "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616760/gigs/s3g27wncmraefyoi6jfz.png",
                  "level": "Level 2",
                  "rate": 4.8
                },
                daysToMake: 3,
                description: "About this gig Start Your Business with a Perfect Logo Design Our team of concept driven professionals works tirelessly to deliver amazing designs that are visually pleasing to the eyes. The professional logo design process plays a significant role in the development of logo and other visual content. Breaking down the entire project into smaller, manageable chunks helps architects, thinkers, and artists approach their tasks with utmost clarity and creativity. What can you get in my gig Original and Unique designs 3D Mockup Source/Vector Files Social Media Kit Logo Transparency Stationery Designs FREE Consultation 24 X 7 VIP support copyrights Our designing services help you get the best leaving the competition in the backyard and zip through the market of logo design companies. Have queries? Contact us in inbox anytime!",
                imgUrl:["https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616104/gigs/t40t1sdutlm1q0d8oxqp.jpg", "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616173/gigs/tvwysc5plrufen5xc4up.png"],
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
                  "imgUrl": "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616829/gigs/kb7ysdpej8mpjnnzalh3.jpg",
                  "level": "",
                  "rate": 4.9
                },
                daysToMake: 3,
                description: "Hello, Welcome to my custom creative logo design gig! I have the superpowers to convert idea's/Sketches into a creative logo. I have the expertise in creating custom, premium, and high-quality logos. I focus on creating simple yet innovative designs that will highly impact the customer's mind. Advantages of working with me: * Get ultimate ideas and unique options to choose the best design. * TOP NOTCH quality will be provided * Multiple revisions * Custom graphics. * Fast delivery with VIP support. * All Copyrights. My Expertise includes: Company Logo | | Professional | Premium | Luxury | Versatile | Minimalist | Modern | Custom | Clean | Vintage | Retro | Badge | Hand drawn | Feminine | Flat | Signature | Business Logos and many more. NOTE: MASCOTS AND DETAILED DESIGNS ARE NOT INCLUDED IN THESE PACKAGES. Lets convert your dreams into a vector design. *** ORDER NOW***",
                imgUrl: ["https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685612841/gigs/fj6kywpggljvflqki2lk.jpg","https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685612883/gigs/mlqhjt9vdxzg4p7vwgtf.jpg" ],
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
                  "imgUrl":"https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616889/gigs/qen2p4dwqjlyrpwnhsqe.png",
                  "level": "pro",
                  "rate": 4.9
                },
                daysToMake: 3,
                description: "Looking for a unique logo concept for your enterprise? WebSutra is a dedicated team which focused on providing unique logo designs based on your branding requirements. We are specialised in minimal logo designs & branding projects which offer complete visual identity developments for enterprises. With 10 years of experience, over 400 projects completed on Fiverr and with over 200 5-star reviews, We will ensure, our unique branding graphics and logo designs will clearly convey your enterprise presence through the design of a quality modern logo and a colour scheme. What will you get? Unique custom made logo that will represent your business Profile picture and header for your social media profiles Stationary design like business card, letterhead and envelope 3D mockups Branding book for your business Transfer of Copyrights Document Please check all our packages and select the one that best suits your budget and requirements. If you have any questions, feel free to message us anytime. We are always happy to help. Thank You!",
                imgUrl: [],
                tags: [
                  "Minimalist",
                ],
                likedByUsers: ['mini-user'] 
                },
                {
                  _id: "i106",
                  title: "I will design your I will design your landscape, backyard, garden, patio and hardscape",
                  price: 100,
                  owner: {
                      "_id": "u106",
                      "fullname": "Dazzlee",
                      "imgUrl": "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685611471/flairr/kari_iomkbb.jpg",
                      "level": "basic",
                      "rate": 5
                  },
                  daysToMake: 7,
                  description: "As a professional landscape architect and urban designer with a Master's degree and over 650 completed projects on Fiverr, I am fully committed to providing exceptional backyard design services to my clients. Whether you are looking to create a tranquil garden, a stylish patio, or a unique hardscape feature, I have the skills and expertise to bring your vision to life. My services include 2D and 3D design, high-quality renderings, and comprehensive project management. I strive to deliver projects on time, to the highest standards, with quick delivery and unlimited revisions to ensure your complete satisfaction. If you are ready to transform your backyard into an oasis, please do not hesitate to contact me to discuss your project and view my portfolio of recent work. I am confident that my expertise and attention to detail will help you to create the backyard of your dreams.",
                  imgUrl: ["https://res.cloudinary.com/dm4cdho4d/image/upload/v1685607683/flairr/design-and-render-interior-and-exterior-projects-within-24h_zsqyzv.jpg","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685607668/flairr/design-and-render-interior-and-exterior-projects-within-24h_auxzm5.jpg", "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685607656/flairr/design-and-render-interior-and-exterior-projects-within-24h_uovqdk.jpg", "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685607618/flairr/design-and-render-interior-and-exterior-projects-within-24h_buoa7g.jpg" ],
                  tags: [
                      "designing",
                      "garden",
                      "architecture",
                      "landscape"
                  ],
                  likedByUsers: ['mini-user']
              }, 
              {
                  _id: "i107",
                  title: "I will design your garden, backyard and render landscape design",
                  price: 50,
                  owner: {
                      "_id": "u107",
                      "fullname": "Eshan",
                      "imgUrl": "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685611433/flairr/1/3f9e6cba-00c6-4c33-bde0-a43bd48a93cf_huyzfh.jpg",
                      "level": "basic",
                      "rate": 4.9
                  },
                  daysToMake: 2,
                  description: "My name is Eshan. I'm a professional landscape architect. For over 5 years, I've been doing landscape design with professional landscape architectural practice. With this Gig I am ready to create your landscape designs, such as gardens, backyard , front yard, pool, patio, outdoor spaces, and indoor spaces",
                  imgUrl: ["https://res.cloudinary.com/dm4cdho4d/image/upload/v1685608039/flairr/1/design-your-dream-garden_aoqh4g.jpg","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685608021/flairr/1/design-your-dream-garden_nn6s82.jpg", "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685607975/flairr/1/design-your-dream-garden_p4y9kc.jpg","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685608001/flairr/1/design-your-dream-garden_gbyher.jpg"  ],
                  tags: [
                      "front yard",
                      "garden",
                      "3d design",
                      "landscape design"
                  ],
                  likedByUsers: ['mini-user']
              },
              {
                  _id: "i108",
                  title: "I will draw perspectives, conceptual sketches, and landscape drawings",
                  price: 20,
                  owner: {
                      "_id": "u108",
                      "fullname": "Ramodha",
                      "imgUrl": "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685612017/flairr/2/8e9b3518-9a37-4ce9-b02d-685182462d1c_mmiti6.jpg",
                      "level": "basic",
                      "rate": 4.9
                  },
                  daysToMake: 3,
                  description: "Hi, I'm Ramodha, a passionate graphic designer with 4 years of experience in Landscape Architecture. I do Freelancer, graphic design, and landscape sketching in my free time. Drop a message and I'll get to .you as soon as I can",
                  imgUrl: ["https://res.cloudinary.com/dm4cdho4d/image/upload/v1685608279/flairr/2/draw-perspectives-conceptual-sketches-and-landscape-drawings-49be_qlnld8.png","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685608227/flairr/2/draw-perspectives-conceptual-sketches-and-landscape-drawings-49be_mhcgfj.jpg", "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685608204/flairr/2/draw-perspectives-conceptual-sketches-and-landscape-drawings-49be_jgrrwn.jpg","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685608250/flairr/2/draw-perspectives-conceptual-sketches-and-landscape-drawings-49be_qbmtoh.jpg"  ],
                  tags: [
                      "perspective",
                      "pencil sketch",
                      "landscape design"
                  ],
                  likedByUsers: ['mini-user']
              }, 
              {
                  _id: "i109",
                  title: "I will design landscape, backyard, patio, garden, and frontyard",
                  price: 70,
                  owner: {
                      "_id": "u109",
                      "fullname": "Yona",
                      "imgUrl": "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685612830/flairr/3/97f53003-65fc-417f-a194-0e8f48cc4770_hfhnpi.jpg",
                      "level": "basic",
                      "rate": 5
                  },
                  daysToMake: 10,
                  description: "I am an architect, with professional skills in creative Designs. I have the skill set to create a great design and visualizations using the latest software. There are added qualities to the designs because of the different perspective applied rather that just the design itself",
                  imgUrl: ["https://res.cloudinary.com/dm4cdho4d/image/upload/v1685612810/flairr/3/do-graphic-design-logo-designs-specifically_y8j8my.jpg","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685612790/flairr/3/do-graphic-design-logo-designs-specifically_f7gvav.jpg", "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685612776/flairr/3/do-graphic-design-logo-designs-specifically_ozoyct.jpg","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685612757/flairr/3/do-graphic-design-logo-designs-specifically_s7bcv8.jpg"  ],
                  tags: [
                      "landscape",
                      "pool design",
                      "landscape design"
                  ],
                  likedByUsers: ['mini-user']
              },
              {
                  _id: "i110",
                  title: "I will create your front garden backyard patio landscape design",
                  price: 80,
                  owner: {
                      "_id": "u110",
                      "fullname": "Maheshika",
                      "imgUrl": "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685613877/flairr/4/874e937a-1369-4199-993d-f17530bd9872_t4j4uw.jpg",
                      "level": "basic",
                      "rate": 4.9
                  },
                  daysToMake: 3,
                  description: "I am a Professional Landscape Architect with almost 05 years of experience in landscape/yard/garden design. I'll be able to design your landscape with a unique style according to your requirements, such as minimalistic gardens, dessert landscapes, midcentury modern, bohemian style, you name it! Doesn't matter if you don't have a clue, will try my best to bring your dream yard to reality.",
                  imgUrl: ["https://res.cloudinary.com/dm4cdho4d/image/upload/v1685614006/flairr/4/create-your-garden-backyard-patio-landscape-design_hurv6a.jpg","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685613988/flairr/4/create-your-garden-backyard-patio-landscape-design_ahpprc.jpg", "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685613969/flairr/4/create-your-garden-backyard-patio-landscape-design_kgg59h.jpg","https://res.cloudinary.com/dm4cdho4d/image/upload/v1685613945/flairr/4/create-your-garden-backyard-patio-landscape-design_n6ttbe.jpg" ],
                  tags: [
                      "perspective",
                      "pencil sketch",
                      "landscape design"
                  ],
                  likedByUsers: ['mini-user']
              }

        ]
        utilService.saveToStorage(STORAGE_KEY, gigs)

    }



// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




