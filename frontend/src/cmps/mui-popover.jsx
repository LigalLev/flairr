import Popover from '@mui/material/Popover'
import { useState } from "react"
import { Formik, Form, Field, getIn } from 'formik'

export function MuiPopover({ btnTitle, children }) {

    const [anchorEl, setAnchorEl] = useState(null)

    function openPopover(event) {
        setAnchorEl(event.currentTarget)
    }


    return (
        <div>
            <button onClick={openPopover} type="button" className='dropdown-btn'>{btnTitle} <span></span></button>
            <Popover
                open={Boolean(anchorEl)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
            >

                {children}

            </Popover>
        </div>
    )
}