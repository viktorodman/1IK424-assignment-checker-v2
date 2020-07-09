import React from 'react'
import { Container, Typography, Grid } from '@material-ui/core'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

const NotFound = () => {
  return (
    <Container maxWidth='sm'>
      <Grid container align='center'>
        <Grid item xs={12}>
          <Typography variant='h3' component='h1'>
            404 Page Not Found
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SentimentVeryDissatisfiedIcon fontSize='large' />
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotFound
