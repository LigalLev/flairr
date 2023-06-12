import Popover from '@mui/material/Popover'
import { useState } from 'react'

export function StatusDropdown(props) {
    const {
        initialStatus,
        onSelectStatus // a function that will send the request according to the value of the selected option
    } = props


    const [anchorEl, setAnchorEl] = useState(false)
    const [orderStatusLabel, setOrderStatusLabel] = useState(initialStatus)

    function openPopover(event) {
        setAnchorEl(event.currentTarget)
    }
    const options = [
        { value: 'pending', label: 'Pending', className: 'btn-pending-status' },
        { value: 'approved', label: 'Approved', className: 'btn-approved-status' },
        { value: 'inProgress', label: 'In-Progress', className: 'btn-in-progress-status' },
        { value: 'completed', label: 'Completed', className: 'btn-completed-status' },
    ]

    function onSelect(option) {
        onSelectStatus(option.value)
        setOrderStatusLabel(option.label)
        setAnchorEl(false)
    }

    return <div>
        <div onClick={openPopover}>{orderStatusLabel}</div>
        <Popover open={Boolean(anchorEl)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',

            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={() => setAnchorEl(false)}
            anchorEl={anchorEl}>
            {options.map(option => {
                return <div className={option.className} onClick={() => {
                    onSelect(option)
                }}>{option.label}</div>
            })}
        </Popover>
    </div>
}


