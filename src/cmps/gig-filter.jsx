import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { loadGigs, setFilterBy } from '../store/gig.actions.js'
import { useNavigate } from 'react-router'


export function GigFilter(props) {

    const [filterBySearch, setFilterBySearch] = useState('')
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const navigate = useNavigate()
    // const debouncedFilterBySearch = utilService.debounce(onFilterBySearch, 500)

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

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

    function onClick() {
        // ev.preventDefault()
        setFilterBy({ txt: filterBySearch })
        navigate('/gig')
    }

    function onChange({ target }) {
        console.log('ev:', target.value)
        setFilterBySearch(target.value)

    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            onClick()
        }
    }

    return <div className='search-bar'>
        <input onChange={onChange}
            ref={elInputRef}
            type="search"
            placeholder={props.placeholder}
            onKeyDown={handleKeyDown}
            name="txt"
            id="header-search-text" />
        <button className='search-btn' onClick={onClick}>
            <svg width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentFill">
                <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z" /></svg>
        </button>
       
    </div>
}
  


