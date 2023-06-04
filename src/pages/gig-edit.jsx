import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from "react-router-dom"

export function GigEdit() {
    const navigate = useNavigate()
    const initialValues = {
        title: '',
        price: '',
        daysToMake: '',
        description: '',
        packages: {
            basic: {
                price: '',
                daysToMake: '',
                included: []
            },
            standard: {
                price: '',
                daysToMake: '',
                included: []
            },
            premium: {
                price: '',
                daysToMake: '',
                included: []
            }
        },
        imgUrls: [],
        tags: []
    }

    function onSubmit() {

        navigate('/gigs-dashboard')
    }

    const formik = useFormik({ initialValues, onSubmit })



    return (
        <section className="gig-edit">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Gig Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder="I will..."
                />

                <label htmlFor="description">Gig description</label>
                <textarea
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    placeholder="Please provide a brief description of the gig."
                />

                <label htmlFor="">Price</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.packages.basic.price}
                    min="5"
                    max="995"
                />

            </form>
        </section>
    )
}