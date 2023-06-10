import { Link } from 'react-router-dom'
export function UserMenu({onLogout, user}) {

    return (
        <div className="user-menu">
            <Link to={`user/${user._id}`} >Profile</Link>
            <Link to="/gigs-dashboard">Become A Seller</Link>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}