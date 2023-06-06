import axios from 'axios'

export const cloudinaryService = {
  uploadImg
}

//FETCH
// const uploadImg = async (ev) => {
async function uploadImg(target) {
  //Defining our variables
  const CLOUD_NAME = 'dqhfnvtca'
  const UPLOAD_PRESET = 'wnu4fjlc'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  const FORM_DATA = new FormData()

  //Bulding the request body
  const inputFiles = [...target.files]
  const uploadPromises = inputFiles.map((file) => {
    FORM_DATA.append('file', file)
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    return axios.post(UPLOAD_URL, FORM_DATA)
  })


  try {
    const responses = await Promise.all(uploadPromises)
    const urls = responses.map((res) => res.data.url)
    console.log('urls: ', urls)
    return urls
  } catch (err) {
    console.error(err)
  }

}

