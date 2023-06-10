import { GigPreview } from "./gig-preview.jsx"

<<<<<<< HEAD
export function GigList({ gigs, onRemoveGig, onEditGig, addToCart }){

    
      
    return <ul className="gig-list">
      {/* { gigs.length} */}
    {gigs.map(gig =>
                <li key={gig._id}>
                    <GigPreview gig={gig} />
    
                    {/* <div>
                        <button onClick={() => { onRemoveGig(gig._id) }}>Delete Item</button>
                        {/* <button onClick={() => { onEditToy(gig) }}>Edit</button> */}
                    {/* </div>} */}
    
                    {/* <button className="buy" onClick={() => { addToCart(gig) }}> */}
                        {/* Add to Cart
                    </button> */}
=======
export function GigList({ gigs}){
    
    return <ul className="gig-list">
    {gigs.map(gig =>
                <li key={gig._id}>
                    <GigPreview gig={gig} />
>>>>>>> refs/remotes/origin/main
                </li>)}
        </ul>
    }

