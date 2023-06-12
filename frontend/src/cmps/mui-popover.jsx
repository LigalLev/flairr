import Popover from '@mui/material/Popover'
import { useState } from "react"
import { Formik, Form, Field, getIn } from 'formik'

export function MuiPopover({ btnTitle, children }) {

    const [anchorEl, setAnchorEl] = useState(false)

    function openPopover(event) {
        setAnchorEl(event.currentTarget)
    }


    return (
        <div>

                    <button onClick={openPopover} >{btnTitle}</button>
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
                        onClose={() => setAnchorEl(false)}
                        anchorEl={anchorEl}
                    >

                        {children}

                    </Popover>           
        </div>
    )
}