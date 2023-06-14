import Popover from '@mui/material/Popover'
import React, { useState } from "react"
import { Formik, Form, Field, getIn } from 'formik'

export function MuiPopover({ btnTitle, children }) {

    const [anchorEl, setAnchorEl] = useState(null)

    function openPopover(event) {
        setAnchorEl(event.currentTarget)
    }
    
    function onClose() {
        setAnchorEl(null)
    }

    const modifiedChildren = React.Children.map(children, (child) => {
        if (child.props.isSubmitBox) {
            return React.cloneElement(child, { onClose: onClose })
        }
        return child
    })

    const isOpen = Boolean(anchorEl) ? 'open' : ''


    return (
        <div>
            <button onClick={openPopover} type="button" className={`dropdown-btn ${isOpen}`}>{btnTitle} <span></span></button>
            <Popover
                style={{ marginTop: '10px', minWidth: '250px' }}
                open={Boolean(anchorEl)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={onClose}
                anchorEl={anchorEl}
            >
                <div className='children-container'>
                    {modifiedChildren}
                </div>

            </Popover>
        </div>
    )
}