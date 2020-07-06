import React, { useState, useContext, useEffect } from 'react'
import {
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Container,
  TextField,
  Grid,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from '@material-ui/icons/Send'

import { GlobalContext } from '../context/GlobalContext'

import ActionAlert from './ActionAlert'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  handInForm: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}))

const HandInForm = () => {
  const { allTestsPass, currentURL, elements } = useContext(GlobalContext)
  const [checked, setChecked] = useState(false)
  const [username, setUsername] = useState('')
  const [shouldShowMessage, setShowMessage] = useState(false)
  const [shouldShowError, setShowError] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    setChecked(false)
  }, [elements])

  useEffect(() => {
    if (allTestsPass) {
      setChecked(true)
    }
  }, [allTestsPass])

  const handleToggle = () => {
    setChecked(!checked)
  }

  const handleNameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = async () => {
    setChecked(false)

    const res = await window.fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, url: currentURL, pass: allTestsPass })
    })

    const response = await res.json()
    if (response.message) {
      setShowMessage(true)
    } else if (response.error) {
      setShowError(true)
    }
  }

  return (
    <div className={classes.handInForm}>
      {elements && (
        <Container maxWidth='sm'>
          <FormControl>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleToggle} />}
                label='Hand in?'
              />
            </FormGroup>
          </FormControl>
          {checked && (
            <>
              <Grid container align='center' justify='center'>
                <Grid item xs={12}>
                  {allTestsPass
                    ? 'Yay! All tests passed. You are ready to hand in.'
                    : 'NOTE: Not all tests have passed.'}
                </Grid>
              </Grid>
              <Grid
                container
                align='center'
                justify='center'
                className={classes.root}
              >
                <TextField
                  placeholder='Your LNU username'
                  variant='outlined'
                  onChange={handleNameChange}
                  value={username}
                />
                <Button
                  variant='outlined'
                  color='primary'
                  disabled={username.length !== 7}
                  onClick={handleSubmit}
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </Grid>
            </>
          )}
          {shouldShowMessage ? (
            <ActionAlert
              color='success'
              message={`${currentURL} has been handed in. You may resubmit if needed, we will automatically erase the previous submitted version with the newer one.`}
            />
          ) : shouldShowError ? (
            <ActionAlert
              color='success'
              message='Failed to submit. Please try again or contact the course administration.'
            />
          ) : (
            ''
          )}
        </Container>
      )}
    </div>
  )
}

export default HandInForm
