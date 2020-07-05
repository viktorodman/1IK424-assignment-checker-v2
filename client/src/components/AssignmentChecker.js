import React, { useEffect, useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { Container, CircularProgress } from '@material-ui/core'

const AssignmentChecker = () => {
  const { urlToCheck } = useContext(GlobalContext)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (urlToCheck) {
      correctAssignment(urlToCheck)
    }
  }, [urlToCheck])

  const correctAssignment = (url) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }
  return (
    <div className='assignment-checker'>
      <Container maxWidth='sm'>
        {isLoading ? <CircularProgress /> : <p>Finished loading...</p>}
      </Container>
    </div>
  )
}

export default AssignmentChecker
