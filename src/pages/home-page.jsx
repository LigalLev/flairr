import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <section>

            
        </section >
    )
}