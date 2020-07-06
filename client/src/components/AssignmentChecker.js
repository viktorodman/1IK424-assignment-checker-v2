import React, { useEffect, useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import {
  Container,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Tooltip,
  Divider,
  ListSubheader,
  Paper
} from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    lineHeight: '1.5em',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}))

const AssignmentChecker = () => {
  const [isLoading, setLoading] = useState(false)
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
    setLoading(true)
    setElements(null)
    const elements = await getWebsiteElements(url)
    setLoading(false)
    setElements(elements)
    setUrlToCheck('')
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

      if (h1 === 1 && p) {
        foundMatch = true
      }
    })

    return foundMatch
  }

  const renderSubPageResults = () => {
    return elements.subPages.map((page) => (
      <List
        key={page.page}
        subheader={
          <ListSubheader className={classes.pageTitle} disableSticky>
            Sub page {page.page}
          </ListSubheader>
        }
      >
        <ListItem>
          <ListItemIcon>
            {page.elements.h1 ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <ErrorIcon color='error' />
            )}
          </ListItemIcon>
          Heading One: Found {page.elements.h1}
        </ListItem>
        <ListItem>
          <ListItemIcon>
            {page.elements.p ? (
              <CheckCircleIcon color='primary' />
            ) : (
              <ErrorIcon color='error' />
            )}
          </ListItemIcon>
          Paragraphs: Found {page.elements.p}
        </ListItem>
      </List>
    ))
  }

  return (
    <div className='assignment-checker'>
      <Container maxWidth='sm'>
        {isLoading && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '15px'
            }}
          >
            <CircularProgress />
          </div>
        )}

        {elements && elements.error ? (
          <Typography variant='body1' color='error'>
            Failed to scan the submitted website. Make sure that the URL is
            correct.
          </Typography>
        ) : (
          elements && (
            <Paper>
              <List>
                <ListSubheader className={classes.pageTitle} disableSticky>
                  Main page
                </ListSubheader>
                <ListItem>
                  <ListItemIcon>
                    {elements.h1 && elements.h1 === 1 ? (
                      <CheckCircleIcon color='primary' />
                    ) : (
                      <Tooltip
                        title='A heading at level one (h1) is missing'
                        placement='right'
                      >
                        <ErrorIcon color='error' />
                      </Tooltip>
                    )}
                  </ListItemIcon>
                  Heading One: Found {elements.h1}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {elements.h2 >= 2 || elements.h3 >= 2 ? (
                      <CheckCircleIcon color='primary' />
                    ) : (
                      <Tooltip
                        title='There should be at least two headings at level two or three (h2 / h3)'
                        placement='right'
                      >
                        <ErrorIcon color='error' />
                      </Tooltip>
                    )}
                  </ListItemIcon>
                  Heading Two or Three: Found {elements.h2 + elements.h3}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {elements.p ? (
                      <CheckCircleIcon color='primary' />
                    ) : (
                      <Tooltip
                        title='There should be at least one paragraph on the main page (p element)'
                        placement='right'
                      >
                        <ErrorIcon color='error' />
                      </Tooltip>
                    )}
                  </ListItemIcon>
                  Paragraphs: Found {elements.p}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {elements.columns >= 2 ? (
                      <CheckCircleIcon color='primary' />
                    ) : (
                      <Tooltip
                        placement='right'
                        title='If you did not use the Gutenberg editor, we will not find any columns. Do not worry, you can still hand in and we will verify.'
                      >
                        <ErrorIcon color='error' />
                      </Tooltip>
                    )}
                  </ListItemIcon>
                  Columns: Found {elements.columns}
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    {hasSubPages() ? (
                      <CheckCircleIcon color='primary' />
                    ) : (
                      <Tooltip
                        title='There should be a link to at least one sub page on the main page'
                        placement='right'
                      >
                        <ErrorIcon color='error' />
                      </Tooltip>
                    )}
                  </ListItemIcon>
                  Sub pages: Found{' '}
                  {hasSubPages() ? elements.subPages.length : 0}
                </ListItem>
              </List>
              <Divider />
              {hasSubPages() && renderSubPageResults()}
            </Paper>
          )
        )}
      </Container>
    </div>
  )
}

export default AssignmentChecker
