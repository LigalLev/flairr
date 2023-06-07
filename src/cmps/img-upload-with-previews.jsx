import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cloudinaryService } from '../services/cloudinary.service'
import { Loader } from './loader'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 4,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  width: '100%'
}

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


export function ImgUploadWithPreviews({ maxFiles = 5, formikField, setFieldValue }) {
  const [uploadedImgUrls, setUploadedImgUrls] = useState([])
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    maxFiles: maxFiles,
    onDrop: acceptedFiles => {
      setIsLoading(true)
      onUploadImg({ target: { files: acceptedFiles } })
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
      console.log('files: ', files)
    }
  })

  useEffect(() => {
    console.log('uploadedImgUrls: ', uploadedImgUrls)
    setFieldValue(formikField, ([...uploadedImgUrls]))
  }, [uploadedImgUrls])

  async function onUploadImg({ target }) {
    const value = await cloudinaryService.uploadImg(target, setIsLoading)
    setUploadedImgUrls((prev) => [...prev, ...value])
  }

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [])

  return (
    <section className="container" style={baseStyle}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Click or drop images here</p>
      </div>

      {!isLoading ?
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
        :
        <Loader />
      }

    </section>
  )
}


