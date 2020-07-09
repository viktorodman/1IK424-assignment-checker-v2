import React from 'react'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import NotFound from '../components/NotFound'

function NotFoundPage () {
  return (
    <div className='Home'>
      <Header />
      <div className='main'>
        <NotFound />
      </div>
      <Footer />
    </div>
  )
}

export default NotFoundPage
