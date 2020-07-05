import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { Container, Grid, TextField, Button } from '@material-ui/core'

const CheckWebsiteForm = () => {
  const { currentURL, setURL } = useContext(GlobalContext)

  const handleChange = (e) => {
    setURL(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentURL) {
      console.log('Submitting current URL', currentURL)
    }
  }
  return (
    <div className='check-website-form'>
      <Container maxWidth='sm'>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid container alignItems='flex-end'>
            <Grid item xs={8}>
              <TextField
                fullWidth
                type='url'
                required
                onChange={handleChange}
                value={currentURL}
                label='Enter your URL'
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                color='primary'
                onClick={handleSubmit}
                variant='contained'
                disabled={currentURL.length < 5}
              >
                Check website
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  )
}

export default CheckWebsiteForm
