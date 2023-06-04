import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { UserDetails } from './pages/user-details'
import { ReviewIndex } from './pages/review-index'
import { HomePage } from './pages/home-page'
import { GigIndex } from './pages/gig-index'
import { GigDetails } from './pages/gig-details'
import { ChatApp } from './pages/chat-app'
import { GigEdit } from './pages/gig-edit'
import { GigPayment } from './pages/gig-payment'


export function RootCmp() {

    return (
        <div className="main-layout">

            <AppHeader />
            <main className='main-layout full'>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<GigIndex />} path="/gig" />
                    <Route element={<GigDetails />} path="/gig/:gigId">
                        {/* <Route element={<GigPayment />} exact path="/gig/:gigId/:payment" /> */}
                        <Route element={<ReviewIndex />} path="reviews" />
                        <Route element={<ChatApp />} path="chat" />
                    </Route>
                    <Route element={<GigEdit />} path="/gig/edit" />
                    <Route element={<GigPayment />} path="/gig/:gigId/:payment" />
                    <Route element={<UserDetails />} path="user/:id" />
                </Routes>
            </main>
            <AppFooter />

        </div>
    )
}


