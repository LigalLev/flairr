import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { loadGigs, setFilterBy } from '../store/gig.actions.js'
import { useNavigate } from 'react-router'


export function BtnsFilter(props) {

    const [filterBySearch, setFilterBySearch] = useState('')
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const navigate = useNavigate()
    // const debouncedFilterBySearch = utilService.debounce(onFilterBySearch, 500)
    const categories = ['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Video & Animation', 'Music & Audio', 'Programming & Tech', ' Business', 'AI Services']
    const elInputRef = useRef(null)

    // useEffect(() => {
    //     elInputRef.current.focus()
    // }, [])

    useEffect(() => {
        console.log('filterBy:', filterBy)

        loadGigs(filterBy)
    }, [filterBy])

    // function onFilterBySearch({ target }) {
    //     console.log('target:', target.value)
    //     const field = target.name
    //     const value = target.value
    //     const newFilterBy = { ...filterBy }
    //     switch (field) {
    //         case 'txt':
    //             newFilterBy[field] = value
    //             break
    //     }
    //     setFilterBy(newFilterBy)
    // }

    function onClick(category) {
        // ev.preventDefault()
        setFilterBy({ category: {category} })
        navigate('/gig')
    }


    // function onChange({ target }) {
    //     console.log('ev:', target.value)
    //     setFilterBySearch(target.value)

    // }

    // function handleKeyDown(ev) {
    //     if (ev.key === 'Enter') {
    //         onClick()
    //     }
    // }

    return <div className='category-btns'>
        {categories.map((category)=>{
            return<div><button onClick={()=>onClick(category)}>{category}</button></div>
        }      
           
 )}
      </div>


// included.map((includedItem) => {
//     return <li><span><svg width="
}