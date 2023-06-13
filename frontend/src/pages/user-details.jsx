import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { loadOrders } from "../store/order.action"
import { loadUser } from '../store/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { SellerOrderList } from '../cmps/seller-order-list'
import { SellerDashboard } from '../cmps/seller-dashboard'
import { saveOrder } from '../store/order.action'


export function UserDetails() {
  const params = useParams()
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.user)
  console.log('user: ', user)
  const orders = useSelector(storeState => storeState.orderModule.orders)


  useEffect(() => {
    loadUser(params.id)
    loadOrders({ sellerId: user._id })


    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }

  }, [])

  useEffect(() => {

  }, [user])

  async function updateOrder(updatedOrder) {
    try {
      const order = await saveOrder(updatedOrder)
      console.log('order saved', order)
    } catch (err) {
      console.log('Cannot set order', err)
    }
  }



  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <section className="user-details main-layout full">
      <section className="user-details-content">
        <article className="user-info flex column">
          <div>
            <div
              className="user-img"
              style={{ backgroundImage: `url(${user.imgUrl})` }}>
            </div>

            <div className='name-username'>
              <h3>
                {user.fullname}
              </h3>
              <p className='light'>@{user.username}</p>
            </div>

            <div className='from-member-since'>
              <div className="from flex space-between">
                <div className='flex row user-from'>
                  <svg width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M5.38338 15.6772C0.842813 9.09472 0 8.41916 0 6C0 2.68628 2.68628 0 6 0C9.31372 0 12 2.68628 12 6C12 8.41916 11.1572 9.09472 6.61662 15.6772C6.31866 16.1076 5.68131 16.1076 5.38338 15.6772ZM6 8.5C7.38072 8.5 8.5 7.38072 8.5 6C8.5 4.61928 7.38072 3.5 6 3.5C4.61928 3.5 3.5 4.61928 3.5 6C3.5 7.38072 4.61928 8.5 6 8.5Z" /></g><defs><clipPath id="clip0"><rect width="12" height="16" /></clipPath></defs></svg>
                  <p>From</p>
                </div>
                <p className='bold '>{user.from}</p>
              </div>
              <div className="flex space-between">
                <div className="flex row member-since" >
                  <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path d="M7 8C9.20938 8 11 6.20937 11 4C11 1.79063 9.20938 0 7 0C4.79063 0 3 1.79063 3 4C3 6.20937 4.79063 8 7 8ZM9.8 9H9.27812C8.58437 9.31875 7.8125 9.5 7 9.5C6.1875 9.5 5.41875 9.31875 4.72188 9H4.2C1.88125 9 0 10.8813 0 13.2V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V13.2C14 10.8813 12.1187 9 9.8 9Z" /></svg>
                  <p>Member since</p>
                </div>
                <p className='bold'>{user.memberSince}</p>
              </div>
            </div>
          </div>
        </article>

        <article className="user-description">
          <div>
            <h3>Description</h3>
            <p>{user.about}</p>
          </div>
        </article>

        <div className="user-action flex">
          {(user.profession) ?
            <div >
              {/* <button onClick={() => navigate('/gig/edit')}>Create a new gig</button>
              <button onClick={() => navigate('/gigs-dashboard')}>Dahsboard</button> */}

              <div className='seller-dashboard-wrapper'>
                <SellerDashboard orders={orders} user={user} />
              </div>



              <SellerOrderList orders={orders} user={user} updateOrder={updateOrder} />
            </div>
            :
            <div className="not-seller-action flex column">
              <div className="img-wrapper">
                <img src="https://res.cloudinary.com/dqhfnvtca/image/upload/v1686464572/flairr/svg_xml_base64_PHN2ZyB3aWR0aD0iMjUyIiBoZWlnaHQ9IjEwNCIgdmlld0JveD0iMCAwIDI1MiAxMDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI_PHBhdGggZD0iTTI1MC42NDEgOTYuMDAwNUgwLjg3NDAyM1YxMDIuNzExSDI1MC42NDFW_cfpyz4.svg" alt="Become a seller illustration" />
              </div>
              <h3>Ready to earn on your own terms?</h3>
              <Link to="/become-seller">Become a Seller</Link>
            </div>
          }
        </div>


      </section>
    </section>
  )
}