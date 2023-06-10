import { Link } from 'react-router-dom'
export function UserMenu({onLogout, user}) {

    return (
        <div className="user-menu">
            <Link to={`user/${user._id}`} className='user-menu-link' >Profile</Link>
            <Link to="/gigs-dashboard" className='user-menu-link' >Become A Seller</Link>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}