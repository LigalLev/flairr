import { useParams} from "react-router-dom"
import { setOrderDot } from "../store/order.action"


export function Payment () {

    return <div>
        <button onClick={()=>setOrderDot(true)}>Pay</button>
    </div>
}
