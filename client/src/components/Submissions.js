import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Container } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SubmissionsTable from './SubmissionsTable'

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

  const updateSubmission = async (submission) => {
    const result = await window.fetch('/api/submission', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ submission })
    })

    const json = await result.json()
    console.log(json)
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
          <SubmissionsTable
            submissions={submissions}
            setSubmissions={setSubmissions}
            updateSubmission={updateSubmission}
          />
        )}
      </Container>
    </div>
  )
}

export default Submissions
