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
    const basicPrice=55
    
    const pendingPercentage = 49;
    const approvedPercentage = 49;
    const complitedPercentage = 1;
    const rejectedPercentage = 1;

    return (
        <section className="seller-dashboard">

            <div className="total-income">
                <p>Active orders</p>
                <p>{ordersLength}</p>
                <p>(${ordersLength*basicPrice})</p>
            </div>
            <div className="progress-wrapper-pending" lable="Default" style={{ width: 100, height: 140 }}>
                <p>Pending</p>
                <CircularProgressbar 
                value={pendingPercentage} 
                text={`${pendingPercentage}%`}
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
                value={approvedPercentage} 
                text={`${approvedPercentage}%`}
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
                value={complitedPercentage} 
                text={`${complitedPercentage}%`}
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
                value={rejectedPercentage} 
                text={`${rejectedPercentage}%`}
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