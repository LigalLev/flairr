import React from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, getIn } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from "react-router-dom"
import { gigService } from '../services/gig.service'
import { saveGig } from "../store/gig.actions"
import { ImgUploadWithPreviews } from '../cmps/img-upload-with-previews'
import { categories, packageTypes, tags } from '../constants/constants'
import { CustomSelect } from '../cmps/mui-form-components'
import MenuItem from '@mui/material/MenuItem';


export function GigEdit() {
    const navigate = useNavigate()
    const params = useParams()
    const gigToEdit = useSelector((storeState) => storeState.gigModule.gigs.find(gig => gig._id === params.gigId)) || gigService.getEmptyGig()
    const loggedInUser =  useSelector((storeState)=>storeState.userModule.user)
    async function onSubmit(updatedGig) {
        console.log('updatedGig: ', updatedGig)
        console.log('loggedInUser:', loggedInUser)
        try {
            if(!updatedGig._id){
                updatedGig.ownerId = loggedInUser._id
                alert(updatedGig)
            }
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
        <section className="gig-edit main-layout full">
            <Formik
                initialValues={{ ...gigToEdit }}
                validationSchema={gigSchema}
                onSubmit={onSubmit}
                enableReinitialize={true}
            >
                {({ errors, touched, dirty, setFieldValue }) => (
                    <Form className='formik gig-edit-form'>
                        <h2>{(params.gigId) ? 'Edit gig' : 'Add a new gig'}</h2>
                        <h3>Overview</h3>

                        <label htmlFor="title">Gig Title
                            <div>
                                <Field as={CustomInput} name="title" placeholder="I will..." />
                                {errors.title && touched.title && <div className="error">{errors.title}</div>}
                            </div>
                        </label>



                        <label htmlFor="description">Description
                            <div>
                                <Field as="textarea" name="description" placeholder="Add a description of your gig." className="description-input" />
                                {errors.description && touched.description && <div className="error">{errors.description}</div>}
                            </div>
                        </label>

                        <label> Images
                            <ImgUploadWithPreviews maxFiles={5} formikField={'imgUrls'} setFieldValue={setFieldValue} />
                        </label>

                        <label htmlFor="category" className="category-label">Category
                            <Field name="category" component={CustomSelect} className="category-select">
                                {/* {
                                    categories.map(category =>
                                        <option key={category} value={category}>{category}</option>
                                    )
                                } */}

                                {categories.map((category) =>
                                    <MenuItem value={category.name} key={category.name}>{category.name}</MenuItem>
                                )}
                            </Field>
                        </label>

                        <div className="tags-select">
                            <label>Tags</label>
                            <div className='tags-checkboxes'>
                                {tags.map(tag =>
                                    <label key={tag}>
                                        <Field type="checkbox" name="tags" value={tag} />
                                        {tag}
                                    </label>
                                )}
                            </div>
                        </div>

                        <h3>Packages</h3>
                        <div className="packages-container">
                            {packageTypes.map(packageType =>
                                <article key={packageType}>
                                    <h6>{packageType}</h6>
                                    <label htmlFor="price">Price</label>
                                    <Field as={CustomInput} name={`packages.${packageType}.price`} />
                                    {getIn(errors, `packages.${packageType}.price`) && getIn(touched, `packages.${packageType}.price`) && <div className="error">{getIn(errors, `packages.${packageType}.price`)}</div>}

                                    <label htmlFor="daysToMake">Days to make</label>
                                    <Field as={CustomInput} name={`packages.${packageType}.daysToMake`} />
                                    {getIn(errors, `packages.${packageType}.daysToMake`) && getIn(touched, `packages.${packageType}.daysToMake`) && <div className="error">{getIn(errors, `packages.${packageType}.daysToMake`)}</div>}
                                </article>
                            )}
                        </div>
                        <div className="btns-container">
                            <button onClick={() => navigate('/gigs-dashboard')} className="back-btn">Back</button>
                            <button type="submit">{(params.gigId) ? 'Save Gig' : 'Create Gig'}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    )
}