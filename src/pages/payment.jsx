import { setOrderNotice } from "../store/order.action"
import { logger } from "workbox-core/_private"
import { showSuccessMsg } from "../services/event-bus.service"
import { useParams, useNavigate } from "react-router-dom"



export function Payment() {
    const [gig, setGig] = useState(null)
    const { gigId } = useParams()
    const navigate = useNavigate()
    const orderToSave = OrderService.getEmptyOrder()

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

    return <div>
        <img src={gig.imgUrls[0]} alt="" />

        <button onClick={() => setOrderNotice(true)}>Pay</button>
    </div>
}
