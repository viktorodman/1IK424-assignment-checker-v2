import React from 'react'
import { Container, Grid, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    background: '#333333',
    color: '#ffffff',
    padding: theme.spacing(2)
  },
  icon: {
    '&:hover': {
      color: '#999999'
    },
    color: '#ffffff',
    transition: '200ms'
  }
}))

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <Container maxWidth='sm' fixed>
        <Grid>
          <Grid item xs={12}>
            <Typography variant='body1' align='center'>
              Made by Adam Bergman
            </Typography>
          </Grid>
          <Grid item xs={12} align='center'>
            <IconButton
              className={classes.icon}
              href='https://github.com/adambergman1'
              target='_blank'
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              className={classes.icon}
              color='primary'
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
