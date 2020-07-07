import React, { useState } from 'react'
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableSortLabel,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const headCells = [
  { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
  { id: 'url', numeric: true, disablePadding: false, label: 'URL' },
  { id: 'pass', numeric: true, disablePadding: false, label: 'All pass' }
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

const SubmissionsTable = ({ submissions }) => {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('username')

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
                (row) => {
                  return (
                    <TableRow hover tabIndex={-1} key={row.username}>
                      <TableCell component='th' scope='row' padding='none'>
                        {row.username}
                      </TableCell>
                      <TableCell align='right'>{row.url}</TableCell>
                      <TableCell align='right'>
                        {row.pass ? 'YES' : 'NO'}
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
