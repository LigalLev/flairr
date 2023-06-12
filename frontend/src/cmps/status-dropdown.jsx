import Popover from '@mui/material/Popover'
import { useState } from 'react'

export function StatusDropdown(props) {
    const {
        initialStatus,
        onSelectStatus
    } = props


    const [anchorEl, setAnchorEl] = useState(false)
    const [orderStatus, setOrderStatus] = useState(initialStatus)

    function openPopover(event) {
        setAnchorEl(event.currentTarget)
    }
    const options = [
        { value: 'pending', label: 'Pending', className: 'btn-pending-status' },
        { value: 'approved', label: 'Approved', className: 'btn-approved-status' },
        { value: 'completed', label: 'Completed', className: 'btn-completed-status' },
        { value: 'rejected', label: 'Rejected', className: 'btn-rejected-status' },
    ]

    function onSelect(option) {
        onSelectStatus(option.value)
        setOrderStatus(option.value)
        setAnchorEl(false)
    }
    
    function getClassName(orderStatus) {
        return options.find(option => option.value === orderStatus).className
    }

    function getLabel(value){
        return options.find(option=> option.value === value).label
    }
    return <div>
        <div onClick={openPopover} className={getClassName(orderStatus)} >{getLabel(orderStatus)} </div>
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
            {options.slice(1).map(option => {
                return <div className={option.className} onClick={() => {
                    onSelect(option)
                }}>{getLabel(option.value)}</div>
            })}
        </Popover>

    </div>
}


