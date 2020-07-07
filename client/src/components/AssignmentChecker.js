import React, { useEffect, useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { Container, CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PagesCheckList from './PagesCheckList'

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    lineHeight: '1.5em',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  loadingArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px'
  }
}))

const AssignmentChecker = () => {
  const [isLoading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const {
    urlToCheck,
    setUrlToCheck,
    elements,
    setElements,
    setAllTestsPass
  } = useContext(GlobalContext)

  const classes = useStyles()

  useEffect(() => {
    if (urlToCheck) {
      correctAssignment(urlToCheck)
    }
  }, [urlToCheck])

  useEffect(() => {
    setAllTestsPass(false)

    if (elements) {
      checkAllTestsPass()
    }
  }, [elements])

  const correctAssignment = async (url) => {
    setShowError(false)
    setLoading(true)
    setElements(null)
    try {
      const elements = await getWebsiteElements(url)
      setElements(elements)
      setUrlToCheck('')
    } catch (error) {
      setShowError(true)
    }
    setLoading(false)
  }

  const getWebsiteElements = async (url) => {
    const res = await window.fetch(`/api/scrape/${url}`, {
      headers: {
        Accept: 'application/json'
      }
    })
    const json = await res.json()
    return json
  }

  const hasSubPages = () => {
    return elements.subPages && elements.subPages.length
  }

  const checkAllTestsPass = () => {
    const { h1, h2, h3, p, columns } = elements

    if (
      h1 === 1 &&
      p >= 1 &&
      (h2 >= 2 || h3 >= 2) &&
      columns >= 2 &&
      hasSubPages() &&
      isOneSubPagePassing()
    ) {
      setAllTestsPass(true)
    }
  }

  const isOneSubPagePassing = () => {
    let foundMatch = false

    elements.subPages.forEach((page) => {
      const { h1, p } = page.elements
      if (h1 === 1 && p) foundMatch = true
    })
    return foundMatch
  }

  return (
    <div className='assignment-checker'>
      <Container maxWidth='sm'>
        {showError && (
          <Typography variant='body1' color='error'>
            Something went wrong. Please contact the course administration.
          </Typography>
        )}
        {!elements && isLoading ? (
          <div className={classes.loadingArea}>
            <CircularProgress />
          </div>
        ) : elements && elements.error ? (
          <Typography variant='body1' color='error'>
            Failed to scan the submitted website. Make sure that the URL is
            correct.
          </Typography>
        ) : elements ? (
          <PagesCheckList
            elements={elements}
            classes={classes}
            hasSubPages={hasSubPages}
          />
        ) : (
          ''
        )}
      </Container>
    </div>
  )
}

export default AssignmentChecker
