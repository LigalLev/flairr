import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'
import { OrderModal } from './order-modal'
import { setOrdeModalVisible, setOrderNotice } from '../store/order.action'
import { SearchFilter } from './search-filter'
import { CategoryFilter } from './category-filter'
import { setFilterBy } from '../store/gig.actions'
import { UserMenu } from './user-menu'
import { socketService } from '../services/socket.service'
import { TemporaryDrawer } from './app-header-drawer'

export function AppHeader() {
    const location = useLocation()
    const [isHomePageTop, setIsHomePageTop] = useState(location.pathname === '/' && window.pageYOffset === 0)
    const [isFilterVisible, setIsFilterVisible] = useState(location.pathname !== '/' || window.pageYOffset > 152)
    const isOrderNotice = useSelector(storeState => storeState.orderModule.isOrderNotice)
    const isOrderModalOpen = useSelector(storeState => storeState.orderModule.isOrderModalOpen)
    const [isShowLoginSignup, setIsShowLoginSignup] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const navigate = useNavigate()
    const [isReceivedOrder, setIsReceiverOrder] = useState(false)

    useEffect(() => {
        /* eslint-disable no-restricted-globals */
        addEventListener('scroll', () => {
            onScroll()
        })
        onScroll()
        return removeEventListener('scroll', onScroll)
    }, [location.pathname])

    useEffect(() => {
        setIsUserMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        socketService.on('received-order', (data) => {
            setIsReceiverOrder(true)
        })
        return () => {
            console.log('cleaning up')
            socketService.off('received-order')
        }
    }, [])

    useEffect(() => {
        socketService.on('order-status-updated', (data) => {
            const order = data?.order;
            const newStatus = data.status
            const sellerName = order.seller.fullname
            setOrderNotice(true)
        })
        return () => {
            console.log('cleaning up')
            socketService.off('order-status-updated')
        }
    }, [])

    function onScroll() {
        setIsHomePageTop((location.pathname === '/') && (window.pageYOffset === 0))
        setIsFilterVisible((location.pathname !== '/') || (window.pageYOffset > 152))
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function getHeaderStyle() {
        const isFixed = (location.pathname === '/') ? 'fixed' : ''
        const isTransparent = (isHomePageTop) ? 'home-page-top' : ''
        const isFilterVisibleClass = (isFilterVisible) ? 'filter-visible' : ''
        return `${isFixed} ${isTransparent} ${isFilterVisibleClass}`
    }

    const user = useSelector(storeState => storeState.userModule.user)

    async function onLogin(credentials) {
        try {
            console.log('credentials:', credentials)
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
            setIsShowLoginSignup(false)
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

    function onClickExplore() {
        console.log(':hi')
        setFilterBy({})
        // navigate('/gig')
    }

    function toggleUserMenu() {
        setIsUserMenuOpen((prev) => !prev)
    }

    function hideOrderNotification() {
        setIsReceiverOrder(false)
    }

    return (
        <header className={`app-header main-layout full ${getHeaderStyle()}`}>

            <div className='header-content'>
                {/* <TemporaryDrawer /> */}
                <div className='logo'>
                    <Link to="/">
                        flai<span className='rr'>rr</span><span className='dot'>.</span>
                    </Link>
                </div>

                <SearchFilter placeholder={'What service are you looking for today?'} isDarkening={true} />

                <nav>
                    <NavLink to="/gig" onClick={() => onClickExplore()} className="orders-btn"> Explore</NavLink>
                    <NavLink to="/become-seller">Become a Seller</NavLink>
                    <div>
                        <button onClick={onClickOrders} className="orders-btn">Orders</button>
                        {isOrderNotice && <span>🔴</span>}
                        {isOrderModalOpen && < OrderModal />}
                    </div>

                    {(user) ?
                        <>
                            <span className="user-info flex">
                                <div
                                    className="user-profile-img"
                                    title={user.fullname}
                                    onClick={toggleUserMenu}
                                >
                                    {user.imgUrl && <img src={user.imgUrl} />}
                                    {isReceivedOrder && <span>🔴</span>}
                                </div>
                                {isUserMenuOpen &&
                                    <UserMenu user={user} onLogout={onLogout}
                                        onProfileCallback={hideOrderNotification} />
                                }
                            </span>
                        </>
                        :
                        <>
                            <NavLink onClick={() => {
                                setIsSignup(false)
                                setIsShowLoginSignup(true)
                            }} to="/">Sign in</NavLink>
                            <button onClick={() => {
                                setIsSignup(true)
                                setIsShowLoginSignup(true)
                            }} className='join-btn'>Join
                            </button>
                        </>
                    }
                    {!user && isShowLoginSignup &&
                        <section className="user-cred">
                            <LoginSignup
                                onLogin={onLogin}
                                onSignup={onSignup}
                                toggleSignup={toggleSignup}
                                isSignup={isSignup}
                                setIsShowLoginSignup={setIsShowLoginSignup}
                            />
                        </section>
                    }
                </nav>
            </div>
            {!location.pathname.includes('payment') && !location.pathname.includes('user') &&
                <CategoryFilter />
            }
        </header>
    )
}  