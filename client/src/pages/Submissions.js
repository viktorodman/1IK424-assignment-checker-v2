import React from 'react'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import Submissions from '../components/Submissions'

function SubmissionsPage () {
  return (
    <div className='Home'>
      <Header />
      <div className='main'>
        <Submissions />
      </div>
      <Footer />
    </div>
  )
}

export default SubmissionsPage
