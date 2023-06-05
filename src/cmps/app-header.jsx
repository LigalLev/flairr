import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { OrderModal } from './order-modal'
import { setOrdeModalVisible, setOrderNotice } from '../store/order.action'

export function AppHeader() {
    const location = useLocation()
    const [isHomePageTop, setIsHomePageTop] = useState(location.pathname === '/' && window.pageYOffset === 0)
    const isOrderNotice = useSelector(storeState => storeState.orderModule.isOrderNotice)
    const isOrderModalOpen = useSelector(storeState => storeState.orderModule.isOrderModalOpen)

    useEffect(() => {
        /* eslint-disable no-restricted-globals */
        addEventListener('scroll', () => { onScroll() })
        console.log('isHomePageTop: ', isHomePageTop)
        onScroll()
        return removeEventListener('scroll', onScroll)
    }, [location.pathname])

    useEffect(() => {
    }, [location.pathname])

    function onScroll() {
        setIsHomePageTop((location.pathname === '/') && (window.pageYOffset === 0))
    }

    function getHeaderStyle() {
        const isFixed = (location.pathname === '/') ? 'fixed' : ''
        const isTransparent = (isHomePageTop) ? 'home-page-top' : ''
        return `${isFixed} ${isTransparent}`
    }

    const user = useSelector(storeState => storeState.userModule.user)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onClickOrders() {
        setOrderNotice(false)
        if (isOrderModalOpen) {
            setOrdeModalVisible(false)
        } else setOrdeModalVisible(true)

    }

    return (
        <header className={`app-header main-layout full ${getHeaderStyle()}`}>
            <div className='logo'>
                <Link to="/">
                    flai<span className='rr'>rr</span><span className='dot'>.</span>
                </Link>
            </div>
            <nav>
                <NavLink to="/gig">Explore</NavLink>
                <NavLink to="/gigs-dashboard">Become a Seller</NavLink>
                <span>
                    <button onClick={onClickOrders}>Orders</button>
                    {isOrderNotice && <span>🔴</span>}
                    {isOrderModalOpen && < OrderModal />}
                </span>
                <NavLink to="/">Sign in</NavLink>
                <button className='join-btn'>Join</button>
            </nav>
        </header>
    )
}  