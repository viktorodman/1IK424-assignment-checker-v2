import React from 'react'
import { Container, Grid, Typography, IconButton } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

const Footer = () => {
  return (
    <footer className='footer'>
      <Container maxWidth='sm' fixed>
        <Grid>
          <Grid item xs={12}>
            <Typography variant='body1' align='center'>
              Made by Adam Bergman.
            </Typography>
          </Grid>
          <Grid item xs={12} align='center'>
            <IconButton href='https://github.com/WPUtvecklare' target='_blank'>
              <GitHubIcon />
            </IconButton>
            <IconButton
              href='https://www.linkedin.com/in/adam-bergman/'
              target='_blank'
            >
              <LinkedInIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
