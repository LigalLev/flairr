import React from "react";
import { useSelector } from 'react-redux'

import { useEffect, useState } from "react"
import { render } from "react-dom";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
// import RadialSeparators from "./RadialSeparators";
import { loadOrders } from "../store/order.action"

export function SellerDashboard({ user }) {
    const orders = useSelector(storeState => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders({ sellerId: user._id })
    }, [])

    const basicPrice = 55
    const pendingCount = orders.filter(order => order.status === 'pending')
    const pendingPercentage = Math.floor((pendingCount.length / orders.length) * 100)

    const approvedCount = orders.filter(order => order.status === 'approved')
    const approvedPercentage = Math.floor((approvedCount.length / orders.length) * 100)

    const completedCount = orders.filter(order => order.status === 'completed')
    const complitedPercentage = ((completedCount.length / orders.length) * 100).toFixed(0)

    const rejectedCount = orders.filter(order => order.status === 'rejected')
    const rejectedPercentage = ((rejectedCount.length / orders.length) * 100).toFixed(0)

    return (
        <section className="seller-dashboard">

            <div className="progress-bars-container">
                <div className="progress-wrapper-pending" lable="Default">
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

                <div className="progress-wrapper-approved" >
                    <p>Approved</p >
                    <CircularProgressbar
                        value={approvedPercentage}
                        text={`${approvedPercentage}%`}
                        strokeWidth={12}
                        styles={buildStyles({
                            textColor: "#404145",
                            pathColor: "#ffb33e",
                            trailColor: "#f7f7f7"
                        })} />
                </div>

                <div className="progress-wrapper-completed" >
                    <p>Completed</p>
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

                <div className="progress-wrapper-declined" >
                    <p>Rejected</p>
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
            </div>

            <div className="orders-summery">
                <div className="active-orders">
                    <p>Active orders:</p>
                    <p>{orders.length}</p>
                </div>
                <div className="total-income">
                    <p>Total:</p>
                    <p>(${orders.length * basicPrice})</p>
                </div>

            </div>

        </section>
    )
}