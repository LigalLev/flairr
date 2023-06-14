import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    return (
        <div className='flex'>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <button className='header-menu-btn' onClick={toggleDrawer(anchor, true)}>&#9776;</button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Box
                            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                            role="presentation"
                            onClick={toggleDrawer(anchor, false)}
                            onKeyDown={toggleDrawer(anchor, false)}
                        >
                            <div className="drawer-content">
                                <button className='join-flairr-btn'>Join Flairr</button>

                            </div>

                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}