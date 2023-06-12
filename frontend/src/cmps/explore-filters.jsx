import { useState, useEffect, useRef } from "react"
import { useSelector } from 'react-redux'
import { useSearchParams, useLocation } from "react-router-dom"
import { loadGigs, setFilterBy } from '../store/gig.actions.js'
import { MuiPopover } from '../cmps/mui-popover'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { Formik, Form, Field, getIn, useFormikContext, useField } from 'formik'
import { languages } from "../constants/constants"

export function ExploreFilters() {

    let [searchParams, setSearchParams] = useSearchParams()


    function onSubmit(filterKeys) {
        console.log('submitting')
        console.log('filterKeys: ', filterKeys)
        filterKeys = {...filterKeys, languages: JSON.stringify(filterKeys.languages)}
        setSearchParams(filterKeys)
    }

    const filterInitialValues = {
        languages: [],
        level: [],
        from: [],
        minPrice: 0,
        maxPrice: 9999
    }
    const [filterByDropdown, setFilterByDropdown] = useState(filterInitialValues)

    function FormSection({ type, checks, filterKey, title, subtitle }) {

        return (
            <div className="checkboxes-container">
                <label className="bold" >{title}</label>
                <div className='checkboxes-wrapper'>
                    {checks.map(check =>
                        <label key={check}>
                            <Field type={type} name={filterKey} value={check} />
                            {check}
                        </label>
                    )}
                </div>
            </div>
        )
    }

    function DollarInput({ field }) {

        function handleChange(ev) {
            const { value } = ev.target
            //regex to make sure the value is numeric
            const numericValue = value.replace(/[^0-9]/g, '')
            if (field && field.onChange) {
                console.log('onchange')
                field.onChange({ target: { value: numericValue, name: field.name } })
            }
        }

        return (
            <OutlinedInput
                endAdornment={<InputAdornment position="end">$</InputAdornment>}
                placeholder='Any'
                onChange={handleChange}
            />
        )
    }

    function SubmitBox({ handleReset }) {
        const { handleSubmit, resetForm } = useFormikContext()

        return (
            <div>
                <button onClick={() => resetForm({ values: filterInitialValues })}>Clear All</button>
                <button type="submit" onClick={handleSubmit}>Apply</button>
            </div>
        )
    }


    return (
        <section className="explore-filters">

            <Formik
                onSubmit={onSubmit}
                initialValues={filterInitialValues}
                enableReinitialize={true}
            >
                <Form>
                    <div className="dropdowns">
                        <article className="seller-details">
                            <MuiPopover btnTitle={'Seller Details'}>
                                <FormSection
                                    type='checkbox'
                                    checks={languages}
                                    filterKey='languages'
                                    title='Seller speaks'
                                    
                                    />
                                <SubmitBox />
                            </MuiPopover>
                        </article>
                        <article className="budget">
                            <MuiPopover
                                btnTitle={'Budget'}>
                                <InputLabel htmlFor="minPrice">MIN.</InputLabel>
                                <Field
                                    component={DollarInput}
                                    id='minPrice'
                                    name='minPrice' />

                                <InputLabel htmlFor="maxPrice">MAX.</InputLabel>
                                <Field
                                    component={DollarInput}
                                    id='maxPrice'
                                    name='maxPrice' />
                                <SubmitBox />
                            </MuiPopover>
                        </article>
                        <article className="delivery-time"></article>
                    </div>
                    <div className="pill-checkboxes"></div>

                </Form>
            </Formik>

        </section>
    )
}

