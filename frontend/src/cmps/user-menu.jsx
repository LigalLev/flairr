import { Link } from 'react-router-dom'
export function UserMenu({onLogout, user, onProfileCallback}) {

    return (
        <div className="user-menu">
            <Link onClick={onProfileCallback} to={`user/${user._id}`} className='user-menu-link' >Profile</Link>
            <Link to="/become-seller" className='user-menu-link' >Become A Seller</Link>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}