import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { loadGigs, setFilterBy } from '../store/gig.actions.js'
import { useNavigate } from 'react-router'
import { categories } from '../constants/constants.js'


export function CategoryFilter(props) {

    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const navigate = useNavigate()

    function onClick(category) {
        // ev.preventDefault()
       const filterByCategory ={ category:  category  }
        setFilterBy(filterByCategory)
        loadGigs(filterByCategory)
        navigate('/gig')
    }



    return <div className='categoty-btns-container main-layout full'> <ul className='category-btns'>
        {categories.map((category) => {
            return <li><button onClick={() => onClick(category)}>{category}</button></li>
        }

        )}
    </ul>
    </div>
}