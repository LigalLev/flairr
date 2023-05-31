import { useEffect, useState } from "react"
import { gigService } from "../services/gig.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { useParams, useNavigate } from "react-router-dom"

export function GigDetails() {
    const [gig, setGig] = useState(null)
    const { gigId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadGig()
    }, [gigId])

    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            console.log('gig:', gig)
            setGig(gig)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/gig')
        }
    }


    return (<section>
        {gig && <div>{gig.title}</div>}
        </section>)
}