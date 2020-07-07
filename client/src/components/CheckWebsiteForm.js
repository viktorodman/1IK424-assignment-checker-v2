import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalContext'
import { Container, Grid, TextField, Button } from '@material-ui/core'

const CheckWebsiteForm = () => {
  const { currentURL, setURL, setUrlToCheck } = useContext(GlobalContext)

  const handleChange = (e) => {
    setURL(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentURL) {
      const checkedURL = checkURL(currentURL)
      setURL(checkedURL)
      setUrlToCheck(checkedURL)
    }
  }

  const checkURL = (url) =>
    url && !url.includes('http') ? 'http://' + url : url

  return (
    <div className='check-website-form'>
      <Container maxWidth='sm'>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid container alignItems='flex-end' justify='space-between'>
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
                fullWidth
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
