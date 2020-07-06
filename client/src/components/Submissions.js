import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SubmissionsTable from './SubmissionsTable'

// function createData (username, url, pass) {
//   return { username, url, pass }
// }

// const submissions = [
//   createData('ab224qr', 'http://google.se', 'YES'),
//   createData('nn222ia', 'http://google.com', 'NO'),
//   createData('ka222vq', 'http://google.co.uk', 'YES')
// ]

const Submissions = () => {
  const [submissions, setSubmissions] = useState([])

  const history = useHistory()

  useEffect(() => {
    getSubmissions().then(({ submissions }) => {
      setSubmissions(submissions)
    })
  }, [])

  const getSubmissions = async () => {
    const result = await window.fetch('/api/submissions')
    const submissions = await result.json()
    return submissions
  }

  const goHome = () => {
    history.push('/')
  }

  return (
    <div className='submissions'>
      <Container maxWidth='md'>
        <Button
          variant='contained'
          onClick={goHome}
          startIcon={<ArrowBackIcon />}
        >
          Home
        </Button>
        {submissions && submissions.length && (
          <SubmissionsTable submissions={submissions} />
        )}
      </Container>
    </div>
  )
}

export default Submissions
