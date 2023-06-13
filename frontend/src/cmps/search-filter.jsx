import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from "react"
import { useSearchParams, useLocation} from "react-router-dom"
import { utilService } from "../services/util.service"
import { loadGigs, setFilterBy } from '../store/gig.actions.js'
import { useNavigate } from 'react-router'

export function SearchFilter(props) {
    
    let [searchParams, setSearchParams] = useSearchParams()
    const [filterBySearch, setFilterBySearch] = useState('')
    const [isOpen, setIsOpen] = useState(false)
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

    useEffect(() => {

    }, [isOpen])

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

    function handleSubmit() {
        // ev.preventDefault()
        setFilterBy({ txt: filterBySearch })
        setIsOpen(false)
        // setSearchParams({ ...searchParams, txt: filterBySearch })
        // navigate(`gig/?txt=${filterBySearch.toString()}`)
        navigate(`gig/?txt=${filterBySearch.toString()}`)
        // navigate("/gig")
    }

    function onChange({ target }) {
        console.log('ev:', target.value)
        setFilterBySearch(target.value)

    }

    function handleKeyDown(ev) {
        if (ev.key === 'Enter') {
            handleSubmit()
        }
    }

    function onToggleIsOpen() {
        if (!props.isDarkening) return
        setIsOpen(prevIsOpen => !prevIsOpen)
    }

    const classMenu = (isOpen) ? 'isOpen' : ''

    return <div className='search-bar'>
        <input
            onChange={onChange}
            onFocus={onToggleIsOpen}
            ref={elInputRef}
            type="search"
            placeholder={props.placeholder}
            onSubmit={() => console.log('hi')}
            onKeyDown={handleKeyDown}
            name="txt"
            id="header-search-text"
            autocomplete="off"
            isDarkening={props.isDarkening}

        />

        <button className='search-btn' onClick={handleSubmit} type="submit">
            <svg width="16"
                height="16"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentFill">
                <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z" /></svg>
        </button>

        {/* <div className={`main-screen ${classMenu}`} onClick={onToggleIsOpen} style={{ zIndex: 200 }}></div> */}
    </div>
}



