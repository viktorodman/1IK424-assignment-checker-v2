import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2)
  }
}))

const ActionAlert = ({ message, color }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert severity={color}>{message}</Alert>
    </div>
  )
}

export default ActionAlert
