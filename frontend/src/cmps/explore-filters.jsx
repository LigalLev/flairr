import { React, useState, useEffect, useRef } from "react"
import { useSelector } from 'react-redux'
import { useSearchParams, useLocation } from "react-router-dom"
import { loadGigs, setFilterBy } from '../store/gig.actions.js'
import { MuiPopover } from '../cmps/mui-popover'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import { FormLabel, FormControlLabel, FormControl, RadioGroup, Radio, useRadioGroup } from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, Form, Field, getIn, useFormikContext, useField, setFieldValue } from 'formik'
import { languages } from "../constants/constants"

export function ExploreFilters() {
    let [searchParams, setSearchParams] = useSearchParams()

    function onSubmit(filterKeys) {
        console.log('submitting')
        console.log('filterKeys: ', filterKeys)
        filterKeys = { ...filterKeys, languages: JSON.stringify(filterKeys.languages) }
        setSearchParams(filterKeys)
    }

    const filterInitialValues = {
        languages: [],
        level: [],
        from: [],
        minPrice: 0,
        maxPrice: 9999,
        daysToMake: 10,
    }
    const [filterByDropdown, setFilterByDropdown] = useState(filterInitialValues)

    function Checkboxes({ checks, filterKey, title, subtitle }) {

        return (
            <div className="checkboxes-container">
                <label className="bold" >{title}</label>
                <div className='checkboxes-wrapper'>
                    {checks.map(check =>
                        <label key={check}>
                            <Field type="checkbox" name={filterKey} value={check} />
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
                label={'margin="normal"'}
            />
        )
    }

    function DeliveryTimeRadio() {
        const { setFieldValue } = useFormikContext()
        function handleChange(ev) {
            setFieldValue('daysToMake', ev.target.value)
        }

        const [field] = useField('daysToMake')

        const theme = createTheme({
            palette: {
                primary: {
                    main: '#000000'
                },

            },
        })

        return (
            <ThemeProvider theme={theme}>
                <FormControl>
                    <RadioGroup

                        name="daysToMake"
                        onChange={handleChange}
                        defaultValue={10}
                    >
                        <FormControlLabel value="1" control={<Radio />} color="primary" label="Express 24H" />
                        <FormControlLabel value="3" control={<Radio />} color="primary" label="Up to 3 days" />
                        <FormControlLabel value="7" control={<Radio />} color="primary" label="Up to 7 days" />
                        <FormControlLabel value="10" control={<Radio />} color="primary" label="Anytime"
                        />
                    </RadioGroup>
                </FormControl>
            </ThemeProvider>
        )
    }

    function SubmitBox({ handleReset, onClose }) {
        const { handleSubmit, resetForm } = useFormikContext()

        function onClearAll() {
            resetForm({ values: filterInitialValues })
            onClose()
        }

        function onApply() {
            handleSubmit()
            onClose()
        }

        return (

            <div className="submit-box">
                <button
                    className="clear-btn"
                    onClick={onClearAll}>
                    Clear All
                </button>
                <button
                    className="submit-btn"
                    type="submit"
                    onClick={onApply}>
                    Apply
                </button>
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

                {({ setFieldValue }) => (
                    <Form>
                        <div className="dropdowns">
                            <article className="seller-details">
                                <MuiPopover btnTitle={'Seller Details'}>
                                    <div className="fields">
                                        <Checkboxes
                                            type='checkbox'
                                            checks={languages}
                                            filterKey='languages'
                                            title='Seller speaks'

                                        />
                                    </div>
                                    <SubmitBox isSubmitBox={true} />
                                </MuiPopover>
                            </article>
                            <article className="budget">
                                <MuiPopover
                                    btnTitle={'Budget'}>
                                    <div className="fields">
                                        <div className="min-price">
                                            <InputLabel htmlFor="minPrice">MIN.</InputLabel>
                                            <Field
                                                component={DollarInput}
                                                id='minPrice'
                                                name='minPrice'

                                            />
                                        </div>

                                        <div className="max-price">
                                            <InputLabel htmlFor="maxPrice" >MAX.</InputLabel>
                                            <Field
                                                component={DollarInput}
                                                id='maxPrice'
                                                name='maxPrice'

                                            />
                                        </div>
                                    </div>
                                    <SubmitBox isSubmitBox={true} />
                                </MuiPopover>
                            </article>
                            <article className="delivery-time">
                                <MuiPopover
                                    btnTitle="Delivery time"
                                >
                                    <div className="fields">
                                        <DeliveryTimeRadio />
                                    </div>
                                    <SubmitBox isSubmitBox={true} />
                                </MuiPopover>
                            </article>
                        </div>
                        <div className="pill-checkboxes"></div>

                    </Form>)}
            </Formik>
        </section>
    )
}

