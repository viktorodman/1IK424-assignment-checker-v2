import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Button,
  Container
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const Submissions = () => {
  const [submissions, setSubmissions] = useState([])
  const history = useHistory()

  useEffect(() => {
    getSubmissions().then(({ submissions }) => {
      setSubmissions(submissions)
    })
  }, [])

  const getSubmissions = async () => {
    const result = await window.fetch('/api/submissions')
    const submissions = await result.json()
    return submissions
  }

  const goHome = () => {
    history.push('/')
  }

  return (
    <div className='submissions'>
      <Container maxWidth='md'>
        <Button
          variant='contained'
          onClick={goHome}
          startIcon={<ArrowBackIcon />}
        >
          Home
        </Button>
        {submissions && submissions.length && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>URL</TableCell>
                  <TableCell>All pass</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.username}>
                    <TableCell>{sub.username}</TableCell>
                    <TableCell>
                      <Link href={sub.url} target='_blank'>
                        {sub.url}
                      </Link>
                    </TableCell>
                    <TableCell>{sub.pass ? 'YES' : 'NO'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  )
}

export default Submissions
