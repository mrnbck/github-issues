import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

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