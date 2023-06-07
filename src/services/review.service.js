import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'review'

export const reviewService = {
  add,
  query,
  remove
}

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.remove('review', reviewId)
}

async function add({ txt, aboutUserId }) {
  // const addedReview = await httpService.post(`review`, {txt, aboutUserId})

  const aboutUser = await userService.getById(aboutUserId)

  const reviewToAdd = {
    txt,
    byUser: userService.getLoggedinUser(),
    aboutUser: {
      _id: aboutUser._id,
      fullname: aboutUser.fullname,
      imgUrl: aboutUser.imgUrl
    }
  }

  reviewToAdd.byUser.score += 10
  await userService.update(reviewToAdd.byUser)
  const addedReview = await storageService.post('review', reviewToAdd)
  return addedReview
}

// function _createReviews() {
//   let reviews = utilService.loadFromStorage(STORAGE_KEY)
//   if (!reviews || !reviews.length)
//     reviews = [
//       {
//         txt: "He is a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result!",
//         byUser: 'choo choo',
//         country: 'Israel',
//         flag: '',
//         aboutUser: {
//           _id: 'd200',
//           fullname: 'some user',
//           imgUrl: 'https://res.cloudinary.com/dm4cdho4d/image/upload/v1685460594/cld-sample.jpg'
//         }
//       },
//     ]
// }