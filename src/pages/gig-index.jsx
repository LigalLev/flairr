import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadGigs, addGig, updateGig, removeGig, addToCart } from '../store/gig.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
// import { gigService } from '../services/gig.service.js'
import { gigService } from '../services/gig.service.local.js'
import { GigList } from '../cmps/gig-list.jsx'
import { CarouselContainer } from '../cmps/carousel-container.jsx'
import { GigFilter } from '../cmps/gig-filter.jsx'

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

    async function onAddGig() {//// will be neede at a seller page 
        const gig = gigService.getEmptyGig()
        gig.title = prompt('Vendor?')
        try {
            const savedGig = await addGig(gig)
            showSuccessMsg(`Gig added (id: ${savedGig._id})`)
        } catch (err) {
            showErrorMsg('Cannot add gig')
        }
    }

    async function onUpdateGig(gig) {
        const price = +prompt('New price?')
        const gigToSave = { ...gig, price }
        try {
            const savedGig = await updateGig(gigToSave)
            showSuccessMsg(`Gig updated, new price: ${savedGig.price}`)
        } catch (err) {
            showErrorMsg('Cannot update gig')
        }
    }

    function onAddToCart(gig) {
        console.log(`Adding ${gig.title} to Gigt`)
        addToCart(gig)
        showSuccessMsg('Added to Gigt')
    }

    function onAddGigMsg(gig) {
        console.log(`TODO Adding msg to gig`)
    }

    return (
            <section className="gig-index">
                <div className ="index-title">All</div>
                <div className="index-gigs-length">{gigs.length} services available</div>
                <GigList
                    gigs={gigs}
                    onRemoveGig={onRemoveGig}
                    onAddGig={onAddGig}
                />                {/* {
                            <button onClick={() => { onAddGigMsg(gig) }}>Add gig msg</button>
                            <button className="buy" onClick={() => { onAddToCart(gig) }}>Add to cart</button>
                        </li>)
                    }
                </ul> } */}
            </section>
    )
}