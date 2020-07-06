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

  const correctAssignment = async (url) => {
    setLoading(true)

    const elements = await getWebsiteElements(url)
    setLoading(false)
    console.log(elements)
  }

  const getWebsiteElements = async (url) => {
    const res = await window.fetch('/api/scrape/http://google.se', {
      headers: {
        Accept: 'application/json',
      },
    })
    const json = await res.json()
    return json
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
