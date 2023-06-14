import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function StatusDropdownDrawer(props) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    })

    const {
        initialStatus,
        onSelectStatus
    } = props

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open })
    }

    const [orderStatus, setOrderStatus] = useState(initialStatus)

    const options = [
        { value: 'pending', label: 'Pending', className: 'btn-pending-status' },
        { value: 'approved', label: 'Approved', className: 'btn-approved-status' },
        { value: 'completed', label: 'Completed', className: 'btn-completed-status' },
        { value: 'rejected', label: 'Rejected', className: 'btn-rejected-status' },
    ]

    function onSelect(option) {
        onSelectStatus(option.value)
        setOrderStatus(option.value)
        toggleDrawer('bottom',false)
    }

    function getClassName(orderStatus) {
        return options.find(option => option.value === orderStatus).className
    }

    function getLabel(value) {
        return options.find(option => option.value === value).label
    }


    return (
        <div>
            {['bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <div onClick={toggleDrawer(anchor, true)} className={getClassName(orderStatus)} >{getLabel(orderStatus)} </div>
                    {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        BackdropProps={{ invisible: true }}
                    >
                        <Box>
                            <div className='status-modal-content'>
                                {options.slice(1).map(option => {
                                    return <div className={option.className} onClick={() => {
                                        onSelect(option)
                                    }}>{getLabel(option.value)}</div>
                                })}
                            </div>
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    )

}
