import React from 'react'
import Header from '../../layouts/Header'
import Footer from '../../layouts/Footer'
import './Home.css'
import CheckWebsiteForm from '../../CheckWebsiteForm'
import GlobalContextProvider from '../../../context/GlobalContext'

function Home () {
  return (
    <GlobalContextProvider>
      <div className='Home'>
        <Header />
        <div className='main'>
          <CheckWebsiteForm />
        </div>
        <Footer />
      </div>
    </GlobalContextProvider>
  )
}

export default Home
