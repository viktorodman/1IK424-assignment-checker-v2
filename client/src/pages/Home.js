import React from 'react'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import CheckWebsiteForm from '../components/CheckWebsiteForm'
import GlobalContextProvider from '../context/GlobalContext'
import AssignmentChecker from '../components/AssignmentChecker'
import HandInForm from '../components/HandInForm'

function HomePage () {
  return (
    <GlobalContextProvider>
      <div className='Home'>
        <Header />
        <div className='main'>
          <CheckWebsiteForm />
          <HandInForm />
          <AssignmentChecker />
        </div>
        <Footer />
      </div>
    </GlobalContextProvider>
  )
}

export default HomePage
