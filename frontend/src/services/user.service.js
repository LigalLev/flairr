import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { utilService } from './util.service.js'

// _createUsers()

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY = 'users'

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
    getEmptyUser
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

async function update({ _id }) {
    const user = await httpService.get('user', _id)
    await storageService.put('user', user)

    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    // const users = await httpService.query('user')
    // const user = users.find(user => user.username === userCred.username)
    const user = await httpService.post('auth/login', userCred)
    if (user) {
        return user
    }
}
async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://res.cloudinary.com/dqhfnvtca/image/upload/v1686399022/flairr/profile_pic_rvmsjs.svg'
    // const user = await httpService.post('user', userCred)
    console.log('userCred: ', userCred)
    const user = await httpService.post('auth/signup', userCred)
    console.log('user: ', user)
    return user
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        username: user.username,
        level: 'Basic',
        profession: user.profession,
        from: user.from,
        languages: user.languages,
        memberSince: user.memberSince,
        about: user.about,
        reviews: [],
        rate: 5
    }
    localStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
    return {
      fullname: '',
      username: '',
      password: '',
      isAdmin: false,
    }
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


function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY_LOGGEDIN_USER)
    if (!users || !users.length)
        users = [{
            _id: "u101",
            fullname: "nadia_younus",
            username: "nadia",
            password: "nadia123",
            profession: "Logo designer",
            from: "Pakistan",
            memberSince: "Jul 2019",
            Languages: "English",
            about: "Hi, It's Nadia, a professional logo designer with more than 2000 satisfied clients, here to provide a premier service to you. As customer satisfaction is a key factor for any project to have a happy ending, I do not compromise with that, and I always make sure client gets more than their expectations. I own the talent, you own a business idea, together we can design the best brand identity for you!",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616615/gigs/cy8yt73ihkig5aklntq8.jpg",
            level: "Flairr's choice",
            rate: 5.0
        },
        {
            _id: "u102",
            fullname: "morningdesigns",
            username: "Kris",
            password: "Kris123",
            profession: "Logo designer",
            from: "Canada",
            memberSince: "Aug 2020",
            Languages: "English",
            about: "Hi, It's Kris, a professional logo designer with more than 500 satisfied clients, here to provide a premier service to you. As customer satisfaction is a key factor for any project to have a happy ending, I do not compromise with that, and I always make sure client gets more than their expectations",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616702/gigs/k1a31fmr4v2gnvu4pwe0.png",
            level: "Top rated",
            rate: 4.9
        },
        {
            _id: "u103",
            fullname: "best_designer89",
            username: "best",
            password: "best123",
            profession: "Logo designer",
            from: "United state",
            memberSince: "june 2018",
            Languages: "English",
            about: "Hi, we are best designers, a professional logo designers with more than 300 satisfied clients, here to provide a premier service to you. As customer satisfaction is a key factor for any project to have a happy ending, We do not compromise with that, and I always make sure client gets more than their expectations. If you pick our team you will have status on your project whenever you feel like",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616760/gigs/s3g27wncmraefyoi6jfz.png",
            level: "Level 2",
            rate: 4.8
        },
        {
            _id: "u104",
            fullname: "mariya_logo99",
            username: "mariya",
            password: "mariya123",
            profession: "Logo designer",
            from: "Canada",
            memberSince: "jan 2021",
            Languages: "English",
            about: "A Graphics & Web Design Graduate, My passion for creating modern, creative & minimalist logo design brought me here on Fiverr, I have a team of creative logo designers with 8+ years of experience in this field.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616829/gigs/kb7ysdpej8mpjnnzalh3.jpg",
            level: "",
            rate: 4.9
        },
        {
            _id: "u105",
            fullname: "websutra",
            username: "websutra",
            password: "websutra123",
            profession: "Logo designer",
            from: "Sri lanka",
            memberSince: "jan 2020",
            Languages: "English",
            about: "WebSutra is a dedicated team of qualified web and graphic design professionals. We have been in the industry over 10 years, Having successfully managed over 400+ client engagements and more than 500+ unique projects for some of the world’s best-loved brands over the past 10 years, we are proud to be considered a thought leader in the web and graphic designing arena. We have worked with clients across 40+ countries including England, Australia, United States, Germany, UAE, Canada, Japan, Singapore, India, SouthAfrica etc.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685616889/gigs/qen2p4dwqjlyrpwnhsqe.png",
            level: "pro",
            rate: 4.9
        },
        {
            _id: "u106",
            fullname: "Dazzlee",
            username: "Dazzlee",
            password: "Dazzlee123",
            profession: "Landscape designer",
            from: "Turkey",
            memberSince: "jul 2015",
            Languages: "English",
            about: "I am a skilled landscape designer with a Master's degree and over 650 completed projects on Fiverr. My expertise in 2D and 3D landscape design allows me to create unique and innovative outdoor spaces that are tailored to my client's specific needs and preferences. I work closely with clients to understand their requirements and deliver high-quality designs that meet their expectations. Let's collaborate to transform your backyard into a beautiful oasis. Contact me to discuss your project.",
            imgUrl: "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685611471/flairr/kari_iomkbb.jpg",
            level: "basic",
            rate: 5
        },
        {
            _id: "u107",
            fullname: "Eshan",
            username: "Eshan",
            password: "Eshan123",
            profession: "Landscape designer",
            from: "India",
            memberSince: "jul 2020",
            Languages: "English",
            about: "I am a skilled landscape designer with a Master's degree and over 1000 completed projects. My expertise in 3D and 3D landscape design allows me to create unique and innovative outdoor spaces that are tailored to my client's specific needs and preferences. I work closely with clients to understand their requirements and deliver high-quality designs that meet their expectations. Let's collaborate to transform your backyard into a beautiful oasis. Contact me to discuss your project.",
            imgUrl: "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685611433/flairr/1/3f9e6cba-00c6-4c33-bde0-a43bd48a93cf_huyzfh.jpg",
            level: "basic",
            rate: 4.9
        },
        {
            _id: "u108",
            fullname: "Ramodha",
            username: "Ramodha",
            password: "Ramodha123",
            profession: "Landscape designer",
            from: "Sri lanka",
            memberSince: "jun 2020",
            Languages: "English",
            about: "Hi,I'm Ramodha, a passionate graphic designer with 4 years of experience in Landscape Architecture. I do Freelancer, graphic design, and landscape sketching in my free time. Drop a message and I'll get to .you as soon as I can.",
            imgUrl: "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685612017/flairr/2/8e9b3518-9a37-4ce9-b02d-685182462d1c_mmiti6.jpg",
            level: "basic",
            rate: 4.9
        },
        {
            _id: "u109",
            fullname: "Yona",
            username: "Yona",
            password: "Yona123",
            profession: "Landscape designer",
            from: "Ethiopia",
            memberSince: "Sept 2021",
            Languages: "English",
            about: "I am an architect, with professional skills in creative Designs. I have the skill set to create a great design and visualizations using the latest software. There are added qualities to the designs because of the different perspective applied rather that just the design itself I offer services with fair price for quality works that have touches of both the creative and architecture worlds. I am at your service so feel free to order Now",
            imgUrl: "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685612830/flairr/3/97f53003-65fc-417f-a194-0e8f48cc4770_hfhnpi.jpg",
            level: "basic",
            rate: 5
        },
        {
            _id: "u110",
            fullname: "Maheshika",
            username: "Maheshika",
            password: "Maheshika123",
            profession: "Landscape designer",
            from: "Sri lanka",
            memberSince: "Oct 2018",
            Languages: "English",
            about: "HI, my name is Maheshika, I’m a Professional Landscape Architect, Landscape & architectural designer, 3D visualizer with creative thinking. I can do design works related to AutoCAD, SketchUp, Lumion, photoshop etc. I can help you to design your architectural/construction/landscape drawings, 2d,3d interior, and exterior photo-realistic rendering, site plan and landscape plan, Photo editing etc. I will provide professional and responsible service for you.",
            imgUrl: "https://res.cloudinary.com/dm4cdho4d/image/upload/v1685613877/flairr/4/874e937a-1369-4199-993d-f17530bd9872_t4j4uw.jpg",
            level: "basic",
            rate: 4.9
        },
        {
            _id: "u111",
            fullname: "wp_corporative",
            username: "brad",
            password: "brad123",
            profession: "Landscape designer",
            from: "Canada",
            memberSince: "Oct 2019",
            Languages: "English",
            about: "I've been delivering web services to multiple businesses across the globe for the last 5 years and I'll deliver a complete one window result to your online presence. Why should you choose us? We've accomplished crew who are capable to deliver 100% satisfaction with solitary WordPress website designs for your old or new sites. We do Customized WordPress website that represent your company Fully Responsiveness Speed-optimized Simple to handle Eye Catching Layout Full Ecommerce capabilities After Sale Services SSL Installation Payment GatewayGoogle Map We Design: E-Commerce website Personal site Portfolio Business Education Health News IT Industry Public Sectors And Many More What Do We Need From You? Log in for your WordPress admin panel Complete Content/Logo Web Design Reference/Inspiration Site *Note: We will be very happy to assist you, please feel free to contact.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685815583/gigs/p0m9qj1qvh0zoou6lmhk.png",
            level: "basic",
            rate: 5
        },
        {
            _id: "u112",
            fullname: "tombaenre",
            username: "tom",
            password: "tom123",
            profession: "Digital Marketing",
            from: "Germany",
            memberSince: "Sept 2019",
            Languages: "English",
            about: "Growing on Instagram can be tough, huh? Hi, I’m Tom - I’m a Content Creator and Social Media Expert from Hamburg, Germany. I and my team's expertise is in creating valuable and industry leading insights based on public data so that there is no login information necessary, which makes my team's services 100% safe. Even though the competition on Instagram is getting tougher from day to day, it is a mixture of knowledge and creative content to step out of the mass of accounts - and we’re providing the needed knowledge to you! Questions? Message us!",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1686143139/gigs/tuxdsybcd4a1xnmcnqok.jpg",
            level: "Level 3",
            rate: 4.9
        },
        {
            _id: "u113",
            fullname: "johnhansen1957",
            username: "john",
            password: "john123",
            profession: "Writing & Translation",
            from: "Australia",
            memberSince: "Sept 2019",
            Languages: "English",
            about: "I am a writer and poet living in Australia. I have a passion for writing and if I can put that drive into providing a service for others I feel very satisfied. I can offer many different styles of poetry and prose from rhyming children's verse to short stories, articles, and advertising blurbs. I can also proofread or edit. If something you require isn’t listed in one of my gigs feel free to ask.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1686144680/gigs/kzlwhhkjdyfripxk0aan.jpg",
            level: "Level 3",
            rate: 4.9
        },
        {
            _id: "u114",
            fullname: "officialrajat",
            username: "rajat",
            password: "rajat123",
            profession: "Digital Marketing",
            from: "India",
            memberSince: "Jul 2017",
            Languages: "English",
            about: "My name is Rajat, I specialise in creating beautiful, usable and professional explainer videos. My main weapons of choice for creating explainer videos are Illustrator and After effects. To find out more about what I can do for you, check out my Gigs in my profile.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1686153373/gigs/daysqf7ewgebacifpeuv.jpg",
            level: "Level 3",
            rate: 4.9
        },
        {
            _id: "u115",
            fullname: "welunsford",
            username: "wes",
            password: "wes123",
            profession: "Music & Audio",
            from: "United States",
            memberSince: "Jun 2020",
            Languages: "English",
            about: "Hi I'm Wes Lunsford I have been performing and recording professionally for the past 15 years. I have played various genres in numerous bands as a freelance musician and have travelled the world as a sideman. I was a musical director for a jazz/soul/R&B group that toured China and currently am 1/2 of the Americana duo and songwriting team, The Young Fables. I sing lead and harmony and play an array of instruments from guitar, keys, mandolin, bass, banjo, etc. and can record fully produced demos.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1686155266/gigs/zzgjbu35micoxxar8zqn.jpg",
            level: "Level 2",
            rate: 5.0
        },
        {
            _id: "u116",
            fullname: "arslannone",
            username: "arslannone",
            password: "arslannone123",
            profession: "Programming & Tech",
            from: "United States",
            memberSince: "Mar 2023",
            Languages: "English",
            about: "Meet Alex, As a Shopify and WordPress expert, I have extensive experience in creating and managing e-commerce websites. With a deep understanding of both platforms, I can provide customized solutions for businesses looking to improve their online presence and increase sales. I use the latest design trends to create responsive, user-friendly store that engage and convert visitors. I also possess extensive knowledge in creating successful e-commerce strategies and optimizing online stores for search engines and marketing campaigns to accelerate sales. Get in touch today! My Regards.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1686159227/gigs/jk7selstsuib2utazby7.jpg",
            level: "Level 2",
            rate: 4.9
        },
        {
            _id: "u117",
            fullname: "rockyzen",
            username: "Andy",
            password: "Andy123",
            profession: "Photography",
            from: "Cambodia",
            memberSince: "Sept 2020",
            Languages: "English",
            about: "I am an Australian and have been selling for over 30 years, with 20 years, working in many countries, training salespeople, professionals, managers, and entrepreneurs to improve their sales skills. I've been in senior operational roles setting up and managing call centers for major 5-star hotel chains all over the world, like the Shangri-La in Philippines, Hilton in Malaysia, Ritz Carlton in Japan, Taj Hotel in South Africa, Hard Rock in Bali, Pan Pacific in Kuala Lumpur, InterContinental. I also do consultancy work with many companies, implementing sales and training programs to key staff.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1686162148/gigs/bpfa1xtomxbe6m0dvwqc.jpg",
            level: "Level 2",
            rate: 5.0
        },
        {
            _id: "u118",
            fullname: "forthecurated",
            username: "forthecurated",
            password: "forthecurated123",
            profession: "Business",
            from: "United States",
            memberSince: "Sept 2020",
            Languages: "English",
            about: "My name is Zach, a 28-year-old serial entrepreneur. I love taking ideas and growing them into successful businesses. I’ve founded 7 companies in the past 9 years, scaling 2 of them to $2M+ in revenue. It was often a lonely journey with no one to bounce ideas off of or trouble-shoot with. That’s why I’m making my skills and unbiased insights available to you. Reach out to me with your business idea or problem and let me help you avoid pitfalls and recognize opportunities. Fine-tune your processes, identify star employees, and fulfill your vision with my expert business coaching.",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1686162678/gigs/phvhzg9opbe6wgp8uptw.jpg",
            level: "Level 3",
            rate: 5.0
        },
        {
            _id: "u119",
            fullname: "daveartgermany",
            username: "Davide",
            password: "Davide123",
            profession: "Photography",
            from: "Germany",
            memberSince: "Feb 2023",
            Languages: "English",
            about: "Hello✌🏼 I‘m Davide, 26 from Germany. I‘m an engineer and AI enthusiast ready to convince with my art:) From app icon designs to food presentation or characters, let my art astonish you😊",
            imgUrl: "https://res.cloudinary.com/dlhjvt9b4/image/upload/v1686163244/gigs/v5rhzvq2as5ovpjaily6.jpg",
            level: "Level 3",
            rate: 5.0
        }
        ]
    utilService.saveToStorage(STORAGE_KEY, users)
}


function getEmptyUser() {
    return {
        _id: '',
        fullname: '',
        imgUrl: '',
        username: '',
        password: '',
        profession: '',
        about: '',
        from: '',
        memberSince: Date.now(),
        languages: [],
        rate: '',
        level: 'Basic',
        reviews: [],

    }
}
