import React from "react";
import { render } from "react-dom";
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
// import RadialSeparators from "./RadialSeparators";

export function SellerDashboard({ orders }) {
    

    const percentage = 66;


    return (
        <section className="seller-dashboard">
            <h1>hey from dashboard</h1>
            <div>
                total income
            </div>
            <div lable="Default">
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>
            <div>
                <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </div>

        </section>
    )
}