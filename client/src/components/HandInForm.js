import React, { useState, useContext } from 'react'
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

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

const HandInForm = () => {
  const { allTestsPass, currentURL } = useContext(GlobalContext)
  const [checked, setChecked] = useState(false)
  const [username, setUsername] = useState('')
  const [shouldShowMessage, setShowMessage] = useState(false)
  const [shouldShowError, setShowError] = useState(false)

  const classes = useStyles()

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
    <div className='hand-in-form'>
      {allTestsPass && (
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
              <Grid>
                <Grid item xs={12}>
                  Yay! All tests passed. You are ready to hand in.
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
            <p>
              {currentURL} has been handed in. You may resubmit if needed, we
              will automatically erase the previous submitted version with the
              newer one.
            </p>
          ) : shouldShowError ? (
            <p>
              Failed to submit. Please try again or contact the course
              administration.
            </p>
          ) : (
            ''
          )}
        </Container>
      )}
    </div>
  )
}

export default HandInForm
