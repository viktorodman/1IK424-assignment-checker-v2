import React, { useState } from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableSortLabel,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  FormGroup,
  FormControlLabel,
  Link
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const headCells = [
  { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
  { id: 'handed_in', numeric: true, disablePadding: false, label: 'Handed in' },
  { id: 'url', numeric: true, disablePadding: false, label: 'URL' },
  { id: 'pass', numeric: true, disablePadding: false, label: 'All pass' },
  { id: 'corrected', numeric: true, disablePadding: false, label: 'Corrected' }
]

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

const SubmissionsTable = ({
  submissions,
  setSubmissions,
  updateSubmission
}) => {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('handed_in')

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  const sortResults = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  const handleCorrectedChange = (submission) => {
    const newSubs = [...submissions]
    const index = newSubs.findIndex((s) => s.username === submission.username)

    submission.corrected = !submission.corrected
    newSubs[index] = submission

    setSubmissions(newSubs)
    updateSubmission(submission)
  }

  const getReadableDate = (date) => {
    const d = new Date(date).toLocaleString()
    return d.substring(0, d.length - 3)
  }

  return (
    <div className={classes.root}>
      <Paper>
        <TableContainer>
          <Table aria-labelledby='tableTitle' aria-label='table'>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortResults(submissions, getComparator(order, orderBy)).map(
                (sub) => {
                  return (
                    <TableRow hover tabIndex={-1} key={sub.username}>
                      <TableCell component='th' scope='row' padding='none'>
                        {sub.username}
                      </TableCell>
                      <TableCell align='right'>
                        {getReadableDate(sub.handed_in)}
                      </TableCell>
                      <TableCell align='right'>
                        <Link href={sub.url} target='_blank'>
                          {sub.url}
                        </Link>
                      </TableCell>
                      <TableCell align='right'>
                        {sub.pass ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell align='right'>
                        <FormGroup row style={{ justifyContent: 'flex-end' }}>
                          <FormControlLabel
                            control={
                              <Switch
                                color='primary'
                                checked={sub.corrected}
                                onChange={() => handleCorrectedChange(sub)}
                              />
                            }
                            label={sub.corrected ? 'Yes' : 'No'}
                          />
                        </FormGroup>
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default SubmissionsTable
