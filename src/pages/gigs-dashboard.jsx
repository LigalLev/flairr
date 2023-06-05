import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'
import { gigService } from '../services/gig.service.local.js'

export function GigsDashboard() {
    const navigate = useNavigate()

    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        loadGigs()
        console.log('gigs: ', gigs)
    }, [])

    function onCreateNewGig() {
        navigate("/gig/edit")
    }

    return (
        <section className="gigs-dashboard">
            <h1>Gigs</h1>

            <button onClick={onCreateNewGig} >Create a new gig</button>

        </section>
    )
}