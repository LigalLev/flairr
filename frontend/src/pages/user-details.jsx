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

          <div>
            <div className="from flex space-between">
              <p>From</p>
              <p className='bold'>{'Israel'}</p>
            </div>
            <div className="member-since flex space-between">
              <p>Member since</p>
              <p className='bold'>{'Feb 2017'}</p>
            </div>
          </div>
        </article>

        <article className="user-description">
          <h3>Description</h3>
          <p>{user.about}</p>
        </article>

        <article className="user-action flex">
          {(user.profession) ?
            <div >
              {/* <button onClick={() => navigate('/gig/edit')}>Create a new gig</button>
              <button onClick={() => navigate('/gigs-dashboard')}>Dahsboard</button> */}


              <SellerDashboard orders={orders} user={user}/>
              


              <div> <SellerOrderList orders={orders} user={user} updateOrder={updateOrder}/> </div>
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


        </article>


      </section>
    </section>
  )
}