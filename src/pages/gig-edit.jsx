import React from 'react'
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
    const packageTypes = ['basic', 'standard', 'premium']
    const categories = ['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Video & Animation', 'Music & Audio', 'Programming & Tech', 'Photography', 'Business', 'AI Services']
    const tags = [
        "logo-design",
        "artisitic",
        "proffesional",
        "accessible"
    ]
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
                initialValues={{ ...gigToEdit }}
                validationSchema={gigSchema}
                onSubmit={onSubmit}
            >
                {({ errors, touched, dirty, setFieldValue }) => (
                    <Form className='formik'>
                        <label htmlFor="title">Gig Title</label>
                        <Field as={CustomInput} name="title" placeholder="I will..." />
                        {errors.title && touched.title && <div>{errors.title}</div>}

                        <label htmlFor="description">Description</label>
                        <Field as="textarea" name="description" placeholder="Add a description of your gig." />
                        {errors.description && touched.description && <div>{errors.description}</div>}

                        <label htmlFor="category">Category</label>
                        <Field name="category" as="select">
                            {
                                categories.map(category =>
                                    <option key={category} value={category}>{category}</option>
                                )
                            }
                        </Field>

                        <div className="tags-select">
                            <h6>Tags</h6>
                            {tags.map(tag =>
                                <label key={tag}>
                                    <Field type="checkbox" name="tags" value={tag} />
                                    {tag}
                                </label>

                            )}
                        </div>

                        {packageTypes.map(packageType =>
                            <article key={packageType}>

                                <h6>{packageType}</h6>
                                <label htmlFor="price">Price</label>
                                <Field as={CustomInput} name={`packages.${packageType}.price`} />
                                {getIn(errors, `packages.${packageType}.price`) && getIn(touched, `packages.${packageType}.price`) && <div>{getIn(errors, `packages.${packageType}.price`)}</div>}

                                <label htmlFor="daysToMake">Days to make</label>
                                <Field as={CustomInput} name={`packages.${packageType}.daysToMake`} />
                                {getIn(errors, `packages.${packageType}.daysToMake`) && getIn(touched, `packages.${packageType}.daysToMake`) && <div>{getIn(errors, `packages.${packageType}.daysToMake`)}</div>}
                            </article>
                        )}



                        <ImgUpload maxFiles={5} formikField={'imgUrls'} setFieldValue={setFieldValue} />
                        <button type="submit">Create Gig</button>

                    </Form>
                )}
            </Formik>

            <button onClick={() => navigate('/gigs-dashboard')}>Back</button>
        </section>
    )
}