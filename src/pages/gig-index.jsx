import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { gigService } from '../services/gig.service.js'
import { gigService } from '../services/gig.service.local.js'
import { GigList } from '../cmps/gig-list.jsx'
import { CarouselContainer } from '../cmps/carousel-container.jsx'
import { GigFilter } from '../cmps/search-filter.jsx'

export function GigIndex() {
    
    const gigs = useSelector(storeState => storeState.gigModule.gigs)
    const filterBy = useSelector((storeState) => storeState.gigModule.filterBy)


    useEffect(() => {
        loadGigs(filterBy)
    }, [])

    async function onRemoveGig(gigId) {
        try {
            await removeGig(gigId)
            showSuccessMsg('Gig removed')
        } catch (err) {
            showErrorMsg('Cannot remove gig')
        }
    }

    console.log('filterByindex:', filterBy)

    return (
        <section className="gig-index">
            <h1 className="index-title">{filterBy.category ? filterBy.category : 'All'}</h1>
            <div className="index-gigs-length">{gigs.length} services available</div>
            <GigList
                gigs={gigs}
                onRemoveGig={onRemoveGig}
                // onAddGig={onAddGig}
            />                {/* {
                            <button onClick={() => { onAddGigMsg(gig) }}>Add gig msg</button>
                            <button className="buy" onClick={() => { onAddToCart(gig) }}>Add to cart</button>
                        </li>)
                    }
                </ul> } */}
        </section>
    )
}