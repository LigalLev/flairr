import React from "react";
import { useEffect, useState } from "react"
import { render } from "react-dom";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
// import RadialSeparators from "./RadialSeparators";

export function SellerDashboard( { orders, user } ) {
    const [ordersLength, setOrdersLength] = useState(orders.filter(order => order.seller._id === user._id).length)
    const basicPrice=30
    
    const percentage = 66;
    return (
        <section className="seller-dashboard">

            <div className="total-income">
                <p>Active orders</p>
                <p>{ordersLength}</p>
                <p>${ordersLength*basicPrice}</p>
            </div>
            <div className="progress-wrapper-pending" lable="Default" style={{ width: 100, height: 140 }}>
                <p>Pending</p>
                <CircularProgressbar 
                value={percentage} 
                text={`${percentage}%`}
                strokeWidth={12}
                styles={buildStyles({
                    textColor: "#404145",
                    pathColor: "#446ee7",
                    trailColor: "#f7f7f7"
                  })} />
            </div>
            <div className="progress-wrapper-approved" style={{ width: 100, height: 100 }}>
                <p>Approved</p >
                <CircularProgressbar 
                value={percentage} 
                text={`${percentage}%`}
                strokeWidth={12}
                styles={buildStyles({
                    textColor: "#404145",
                    pathColor: "#ffb33e",
                    trailColor: "#f7f7f7"
                  })}  />
            </div>
            <div className="progress-wrapper-declined" style={{ width: 100, height: 100 }}>
                <p>Complited</p>
                <CircularProgressbar 
                value={percentage} 
                text={`${percentage}%`}
                strokeWidth={12}
                styles={buildStyles({
                    textColor: "#404145",
                    pathColor: "#1dbf73",
                    trailColor: "#f7f7f7"
                  })}
                 />
            </div>
            <div className="progress-wrapper-declined" style={{ width: 100, height: 100 }}>
                <p>Declined</p>
                <CircularProgressbar 
                value={percentage} 
                text={`${percentage}%`}
                strokeWidth={12}
                styles={buildStyles({
                    textColor: "#404145",
                    pathColor: "#CD1818",
                    trailColor: "#f7f7f7"
                  })}
                 />
            </div>
           
        </section>
    )
}