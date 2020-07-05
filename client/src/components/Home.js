import React from 'react'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import './Home.css'

function Home () {
  return (
    <div className='Home'>
      <Header />
      <div className='main'>
        <p>Hello from Home</p>
      </div>
      <Footer />
    </div>
  )
}

export default Home
