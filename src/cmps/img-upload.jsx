import React from 'react'
import { useEffect, useState } from "react"
import { useDropzone } from 'react-dropzone'
import { cloudinaryService } from '../services/cloudinary.service'


export function ImgUpload({ maxFiles = 5, formikField, setFieldValue }) {

  const [uploadedImgUrls, setUploadedImgUrls] = useState([])
  useEffect(() => {
    console.log('uploadedImgUrls: ', uploadedImgUrls)
    setFieldValue(formikField, ([...uploadedImgUrls]))
  }, [uploadedImgUrls])


  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({ maxFiles: maxFiles })


  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))


  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map(e => <li key={e.code}>{e.message}</li>)}
        </ul>

      </li>
    )
  })

  async function onUploadImg({ target }) {
    console.log('target.files: ', target.files)
    const value = await cloudinaryService.uploadImg(target)
    setUploadedImgUrls((prev) => [...prev, ...value])
  }

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} onChange={onUploadImg} />
        <img src="https://res.cloudinary.com/dqhfnvtca/image/upload/v1686057854/flairr/upload_nrh2mm.svg" alt="Upload images" />
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  )
}
