import { GigPreview } from "./gig-preview.jsx"

export function GigList({ gigs, onRemoveGig, onEditGig, addToCart }){

    
      
    return <ul className="gig-list">
    {gigs.map(gig =>
                <li className="gig-preview" key={gig._id}>
                    <ToyPreview gig={gig} />
    
                    <div>
                        <button onClick={() => { onRemoveGig(gig._id) }}>Delete Item</button>
                        {/* <button onClick={() => { onEditToy(gig) }}>Edit</button> */}
                    </div>
    
                    <button className="buy" onClick={() => { addToCart(gig) }}>
                        Add to Cart
                    </button>
                </li>)}
        </ul>
    }

