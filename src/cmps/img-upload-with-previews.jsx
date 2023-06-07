import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cloudinaryService } from '../services/cloudinary.service'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
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
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    maxFiles: maxFiles,
    onDrop: acceptedFiles => {
      onUploadImg({target: {files: acceptedFiles}})
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  })

  useEffect(() => {
    console.log('uploadedImgUrls: ', uploadedImgUrls)
    setFieldValue(formikField, ([...uploadedImgUrls]))
  }, [uploadedImgUrls])

  async function onUploadImg({ target }) {
    console.log('target.files: ', target.files)
    const value = await cloudinaryService.uploadImg(target)
    setUploadedImgUrls((prev) => [...prev, ...value])
  }

  function testy(){
    console.log('testy toast')
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
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container" style={baseStyle}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()}/>
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  )
}


