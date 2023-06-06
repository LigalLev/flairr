import React from 'react'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, getIn } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from "react-router-dom"
import { gigService } from '../services/gig.service.local'
import { saveGig } from "../store/gig.actions"
import { ImgUpload } from '../cmps/img-upload'


export function GigEdit() {
    const navigate = useNavigate()
    const params = useParams()
    const gigToEdit = useSelector((storeState) => storeState.gigModule.gigs.find(gig => gig._id === params.gigId)) || gigService.getEmptyGig()
    // const [updatedGig, setUpdatedGig] = useState(gigToEdit)

    // useEffect(() => {
    //     if (!params.gigId) return
    //     loadGig()
    //     // eslint-disable-next-line
    // }, [])

    // async function loadGig() {
    //     try {
    //         const gig = await gigService.getById(params.gigId)
    //         setUpdatedGig(gig)
    //     } catch (err) {
    //         console.log('Had issue in gig details', err)
    //         navigate('/gigs-dashboard')
    //     }
    // }

    const initialValues = {
        title: '',
        price: '',
        description: '',
        packages: {
            basic: {
                price: 5,
                daysToMake: 1,
                included: []
            },
            standard: {
                price: 5,
                daysToMake: 1,
                included: []
            },
            premium: {
                price: 5,
                daysToMake: 1,
                included: []
            }
        },
        imgUrls: [],
        tags: []
    }

  

    async function onSubmit(updatedGig) {
        console.log('updatedGig: ', updatedGig)
        try {
            const gig = await saveGig(updatedGig)
            console.log('gig saved', gig)
            navigate('/gig')
        } catch (err) {
            console.log('Cannot set gig', err)
        }
    }

    const gigSchema = Yup.object().shape({
        title: Yup.string()
            .min(5, 'Too short!')
            .max(100, 'Too long!')
            .required('Required'),
        description: Yup.string()
            .required('Required'),
        packages: Yup.object().shape({
            basic: Yup.object().shape({
                price: Yup.number()
                    .min(5, 'Minimum price is $5')
                    .max(995, 'Maximum price is $995')
                    .required('Required'),
                daysToMake: Yup.number()
                    .min(1, 'At least one day')
                    .max(10, "Can't be over 10 days")
                    .required('Required')
            })
        })
    })

    function CustomInput(props) {
        return <input id="outlined-basic" label="Outlined" variant="outlined" {...props} />
    }

    return (
        <section className="gig-edit">
            <h1>Add a new gig</h1>
            <Formik
                initialValues={{...gigToEdit}}
                validationSchema={gigSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, dirty, setFieldValue}) => (
                    <Form className='formik'>
                        <label htmlFor="title">Gig Title</label>
                        <Field as={CustomInput} name="title" placeholder="I will..." />
                        {errors.title && touched.title && <div>{errors.title}</div>}

                        <label htmlFor="description">Description</label>
                        <Field as="textarea" name="description" placeholder="Add a description of your gig." />
                        {errors.description && touched.description && <div>{errors.description}</div>}

                        <label htmlFor="price">Price</label>
                        <Field as={CustomInput} name="packages.basic.price" />
                        {getIn(errors, 'packages.basic.price') && getIn(touched, 'packages.basic.price') && <div>{getIn(errors, 'packages.basic.price')}</div>}

                        <label htmlFor="daysToMake">Days to make</label>
                        <Field as={CustomInput} name="packages.basic.daysToMake" />
                        {getIn(errors, 'packages.basic.daysToMake') && getIn(touched, 'packages.basic.daysToMake') && <div>{getIn(errors, 'packages.basic.daysToMake')}</div>}

                        <ImgUpload maxFiles={5} formikField={'imgUrls'} setFieldValue={setFieldValue}/>
                        <button type="submit">Create Gig</button>

                    </Form>
                )}
            </Formik>

            <button onClick={() => navigate('/gigs-dashboard')}>Back</button>
        </section>
    )
}