import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, removeGig} from '../store/gig.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { GigList } from '../cmps/gig-list.jsx'
import { useLocation, useSearchParams } from 'react-router-dom'
import { ExploreFilters } from '../cmps/explore-filters.jsx'


export function GigIndex() {

    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams(new URLSearchParams(location.search))

    let paramsObj = {}
    useEffect(() => {
        loadGigs(filterBy)
    }, [searchParams])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    // const categoryForFilter = searchParams.values().next().value

    // const categoryForFilter = searchParams.has('category') ? searchParams.get('category') : 'All'
    const categoryForFilter = searchParams.get('txt') || searchParams.get('category') ||  searchParams.get('tags') ||'All'
    return (
        <section className="gig-index">
            <h1 className="index-title">{categoryForFilter ? categoryForFilter : 'All'}</h1>
            <ExploreFilters />
            <div className="index-gigs-length">{gigs.length} services available</div>
            <GigList
                gigs={gigs}
                onRemoveGig={onRemoveGig}
            />
        </section>
    )
}