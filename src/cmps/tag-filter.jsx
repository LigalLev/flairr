import { useSelector } from 'react-redux'
import { loadGigs, setFilterBy } from '../store/gig.actions.js'
import { useNavigate } from 'react-router'
import { categories } from '../constants/constants.js'


export function TagFilter(props) {

    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const navigate = useNavigate()


    function onClick(tag) {
        // ev.preventDefault()
        const filterByTag = { tag: tag }
        setFilterBy(filterByTag)
        loadGigs(filterByTag)
        navigate('/gig')
    }


    return <ul>
        {props.popularTags.map(tag =>
            <li key={tag}>
                <button onClick={() => onClick(tag)}>
                    {tag}
                </button>
            </li>
        )}

    </ul>


    // included.map((includedItem) => {
    //     return <li><span><svg width="
}