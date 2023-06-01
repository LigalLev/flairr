import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Hero } from '../cmps/hero'

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)

    return (
        <section className="home-page main-layout full">
            <Hero />
        </section>
    )
}