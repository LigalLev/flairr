import { useState, useEffect, useRef } from "react"
import { useSelector } from 'react-redux'
import { useSearchParams, useLocation } from "react-router-dom"
import { loadGigs, setFilterBy } from '../store/gig.actions.js'
import { MuiPopover } from '../cmps/mui-popover'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { Formik, Form, Field, getIn, useFormikContext } from 'formik'
import { languages } from "../constants/constants"
export function ExploreFilters() {

    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    let [searchParams, setSearchParams] = useSearchParams()
    const [filterByDropdown, setFilterByDropdown] = useState({})
    
    useEffect(() => {
        console.log('filterBy:', filterBy)

        loadGigs(filterBy)
    }, [filterBy])



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


    function SubmitBox({ handleReset }) {
        const formik = useFormikContext()

        function handleReset() {
            formik.resetForm({ values: filterInitialValues })
        }

        function handleClearAll() {
            handleReset()
        }
        return (
            <div>
                <button onClick={() => handleReset()}>Clear All</button>
                <button type="submit">Apply</button>
            </div>
        )
    }


    function onSubmit(filterBy) {
        console.log('filterBy: ', filterBy)
        setFilterByDropdown((prev) => ({...prev, ...filterBy}))
        setSearchParams(filterByDropdown)
    }

    const filterInitialValues = {
        languages: [],
        level: [],
        from: [],
        minPrice: '',
        maxPrice: ''
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
                                    title='Seller speaks' />
                                <SubmitBox />
                            </MuiPopover>
                        </article>
                        <article className="budget">
                            <MuiPopover
                                btnTitle={'Budget'}>
                                {/* <FormSection
                                    type='radio'
                                    checks={['Value', 'Mid-range', 'High-end', 'Custom']}
                                    filterKey='price'
                                    title=''
                                /> */}

                                <InputLabel htmlFor="minPrice">MIN.</InputLabel>
                                <OutlinedInput
                                    id='minPrice'
                                    endAdornment={<InputAdornment
                                        position="end">$</InputAdornment>}
                                    placeholder='Any'
                                />


                                <InputLabel htmlFor="maxPrice">MAX.</InputLabel>
                                <OutlinedInput
                                    id='maxPrice'
                                    endAdornment={<InputAdornment position="end">$</InputAdornment>}
                                    placeholder='Any'
                                />
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

