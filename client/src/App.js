import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/Home'
import SubmissionsPage from './pages/Submissions'
import NotFoundPage from './pages/NotFound'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/submissions' component={SubmissionsPage} />
        <Route path='' component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App
