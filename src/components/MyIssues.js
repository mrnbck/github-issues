import React from 'react'
import PropTypes from 'prop-types'
import { 
  BrowserRouter as Router, Link, useHistory } from 'react-router-dom'

const MyIssues = ({ 
  issues, setIssue, 
  setShowIssue }) => {

  const history = useHistory()

  const openIssue = (issue) => {
    //useState to make the issue available to move it to the next component
    setIssue(issue)
    setShowIssue(true)
    history.push(`../issues/id/${issue.id}`)
  }

  if (issues[0] === 'login') {
    
    const handleLogin = async (event) => {
      event.preventDefault()
      try {
        const response = await fetch('/api/login')
        const url = await response.text()
  
        /*window.open(url,
        'Github Login',
        'menubar=no,location=no,resizable=no,'+
        'scrollbars=no,status=no,width=700,'+
        'height=726'
      )*/
        window.location.assign(url)
      } catch (error) {
        console.log(error)
      }
    }

    const styleLoginButton = {
      marginTop: '30px'
    }

    return (
    //if the user is not logged in yet, show Login button
      <div className='containers'>
        <div>To view your assigned issues, please login to GitHub first</div>
        <Router>
          <Link to='/login'>        
            <button 
              style={styleLoginButton}
              className='close-button'
              onClick={handleLogin}>Login
            </button>
          </Link>
        </Router>
      </div>)
  } else 

    return (
      <div className='issue-list'>
        <h3>My Issues</h3>      
        <div>{issues.map(issue => 
          (<div 
            key={issue.id} 
            className='issue-list-item' 
            onClick={() => openIssue(issue) }>
            {issue.title}
          </div>))}
        </div>
      </div>
    )
  
}

MyIssues.propTypes = {
  issues: PropTypes.array,
  setShowIssue:PropTypes.func,
  setIssue:PropTypes.func
}

export default MyIssues