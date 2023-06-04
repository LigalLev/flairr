// import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

export function GigsDashboard() {
    const navigate = useNavigate()

    function onCreateNewGig() {
        navigate("/gig/edit")
    }

    return (
        <section className="gigs-dashboard">
            <h1>Gigs</h1>

            <button onClick={onCreateNewGig} >Create a new gig</button>

            <pre>
                render gig object here
            </pre>
        </section>
    )
}