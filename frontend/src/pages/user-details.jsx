import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { loadUser } from '../store/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

export function UserDetails() {

  const params = useParams()
  const navigate = useNavigate()
  const user = useSelector(storeState => storeState.userModule.user)
  console.log('user: ', user)
  useEffect(() => {
    loadUser(params.id)

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }

  }, [])

  useEffect(() => {

  }, [user])

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <section className="user-details">
      <h1>User Details</h1>
      {user && <div>
        <h3>
          {user.fullname}
        </h3>
        {/* Demo for dynamic images: */}
        <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}>
        </div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>}

      {user.profession &&
        <button onClick={() => navigate('/gig/edit')}>Create a new gig</button>
      }
    </section>
  )
}