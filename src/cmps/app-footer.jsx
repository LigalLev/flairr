
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'

import { removeFromCart, checkout } from '../store/gig.actions'
import { UserMsg } from './user-msg.jsx'

export function AppFooter() {
  

    return (
        <footer className="app-footer main-layout full">
            <p>
                coffeerights 
            </p>
            
        </footer>
    )
}