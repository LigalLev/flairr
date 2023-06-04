import {CCPayment} from '../cmps/cc-payment'
import { setOrderNotice } from "../store/order.action"
import { logger } from "workbox-core/_private"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { orderService } from "../services/order.service"
import { gigService } from "../services/gig.service.local"
import { saveOrder } from '../store/order.action'


export function Payment() {
    const [gig, setGig] = useState(null)
    const { gigId } = useParams()
    const navigate = useNavigate()
    // const orderToSave = orderService.getEmptyOrder()

    useEffect(() => {
        loadGig()
    }, [gigId])

    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            setGig(gig)
        } catch (err) {
            console.log('Had issues in order details', err)
            showErrorMsg('Cannot load order')
            navigate('/gig')
        }
    }

    async function onAddOrder(orderToSave) {
        try {
            const savedOrder = await saveOrder(orderToSave)
            showSuccessMsg(`order added (id: ${savedOrder._id})`)

        } catch {

        }
    }

    return (<div >
        {gig && <div> <img src={gig.imgUrls[0]} alt="" />
            <div>{gig.title}</div>
            <div>{gig.level}</div>
            <div className="details-wrapper">
                <h2>{gig.owner.fullname}</h2>
                <p className="gig-email">@{gig.owner.fullname}</p>
                <p className="gig-level">Level {gig.owner.level} <span>|</span></p>
                <p className="gig-rate"> <span>&#9733; &#9733; &#9733; &#9733; &#9733;{gig.owner.rate}</span> (116)</p>
                {/* <span className="rating-filled">{getRatingString(gig)}</span> */}
                <p className="gig-orders">14 Orders in Queue</p>
            </div>
            <div>{gig.price}</div>



        </div>}
        <CCPayment/>

        <button onClick={() => setOrderNotice(true)}>Pay</button>
    </div>)
}
