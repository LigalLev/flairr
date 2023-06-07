import { CCPayment } from '../cmps/cc-payment'
import { setOrderNotice } from "../store/order.action"
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
    const included = ['Vector file', 'One concept included', 'Include source file', 'Progress update', 'Printable file']
    const [orderToSave, setOrderToSave] = useState(orderService.getEmptyOrder())

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
            console.log('gig:', gig)
            const newOrder = orderToSave
            newOrder.gig._id = gig._id
            newOrder.gig.title = gig.title
            newOrder.gig.imgUrl = gig.imgUrls[0]
            newOrder.gig.price = gig.price
            newOrder.seller.fullname = gig.owner.fullname
            setOrderToSave(newOrder)
            const savedOrder = await saveOrder(orderToSave)
            showSuccessMsg(`order added (id: ${savedOrder._id})`)

        } catch {

        }
    }

    return (
        <div className="order-details">
            <CCPayment />

            {gig && <div className='order-information-summery'>
                <div className='header-order-wrapper'>
                    <img src={gig.imgUrls[0]} alt="" />
                    <p>{gig.title}</p>
                </div>

                <div>{gig.level}</div>
                <div className='gig-owner-fullname'>{gig.owner.fullname}</div>
                <div className='order-items-wrapper'>
                    <ul>
                        {included.map((includedItem) => {
                            return <li><span><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z" /></svg></span>{includedItem}</li>
                        })}
                    </ul>
                </div>

                <div className='total-payment-wrapper'>
                    <p>You'll pay</p>
                    <div>${gig.price}</div>
                </div>    
                <div className='totel-delivery-time'>
                    <p>Total delivery time</p>
                    <p>{gig.daysToMake} days</p>
                </div>    
                
                <button className="btn-pay" onClick={() => {
                    setOrderNotice(true)
                    onAddOrder(orderToSave)
                }}>Pay</button>

                <div className='ssl-secure'>
                    <p>SSL Secure Payment</p>
                </div>
            </div>}



        </div>)
}
