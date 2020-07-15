import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { 
  BrowserRouter as Router, Link } from 'react-router-dom'
import ShowIssues from './ShowIssues'

const MyIssues = ({ 
  issues, setIssue, page, url, setUrl, currentPage, setShowIssue }) => {

  const regex = /.+[^\d]/ /*get everything except the number at the end*/
  const link = url.match(regex)[0]
    
  useEffect(() => {

    if (link.length > 0 && Number(page)>0) {
      setUrl(link+currentPage) 
    }    
    // eslint-disable-next-line
    },[currentPage])
  
  console.log(issues)

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

    return (
    //if the user is not logged in yet, show Login button
      <div className='containers'>
        <div>To view your assigned issues, please login to GitHub first</div>
        <Router>
          <Link to='/login'>        
            <button 
              style={{ marginTop: '30px' }}
              className='button login-button'
              onClick={handleLogin}>Login
            </button>
          </Link>
        </Router>
      </div>)
  } else 

    return (
      <div><ShowIssues 
        setIssue = {setIssue}
        setShowIssue = {setShowIssue}
        issues = {issues}
      /></div>
    )
  
}

MyIssues.propTypes = {
  issues: PropTypes.array,
  setShowIssue:PropTypes.func,
  setIssue:PropTypes.func
}

export default MyIssues