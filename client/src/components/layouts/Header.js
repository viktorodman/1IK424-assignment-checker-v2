import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#ffe000',
    color: '#000000'
  }
}))

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar} position='relative'>
      <Toolbar>
        <Typography
          align='center'
          variant='h6'
          component='h1'
          noWrap
          style={{ width: '100%' }}
        >
          1IK424 Assignment 3 Checker
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
