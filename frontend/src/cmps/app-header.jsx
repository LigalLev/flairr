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
import { NotificationBubble } from './notification-bubble'

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
        const isBottomBorder = ((location.pathname.includes('payment') || location.pathname.includes('user')) ? 'header-border' : '')
        return `${isFixed} ${isTransparent} ${isFilterVisibleClass} ${isBottomBorder}`
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
                { window.innerWidth < 600 &&
                <TemporaryDrawer />
                }
                <div className='logo'>
                    <Link to="/">
                        flai<span className='rr'>rr</span><span className='dot'>.</span>
                    </Link>
                </div>

                {!location.pathname.includes('payment') && 
                <SearchFilter placeholder={'What service are you looking for today?'} isDarkening={true} />
                }

                <nav>
                    <NavLink to="/gig" onClick={() => onClickExplore()} className="explore-btn"> Explore</NavLink>
                    <NavLink to="/become-seller" className='become-seller-btn'>Become a Seller</NavLink>
                    <div className='flex'>
                        <button onClick={onClickOrders} className="orders-btn">Orders</button>
                        {isOrderNotice && <span className='notification'>
                            
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z" fill="#ff0000"></path> <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#ff0000"></path> </g></svg>
                            </span>}
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
                                    {/* {isReceivedOrder && <span>🔴</span>} */}
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
            {isReceivedOrder && <NotificationBubble text = {"You've got a new order!"} onHide={()=>setIsReceiverOrder(false)}/>}
        </header>
    )
}  