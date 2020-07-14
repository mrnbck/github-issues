import React from 'react'
import convertDate from '../helpers/convertDate'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

const ShowIssues = ({ 
  setIssue,
  setShowIssue,
  issues
}) => {

  const history = useHistory()

  const openIssue = (issue) => {
    //useState to make the issue available to move it to the next component
    setIssue(issue)
    setShowIssue(true)
    history.push(`../issues/id/${issue.id}`)
  }

  const issueState = (state) => {
    if (state === 'open') {
      return 'issue-state-open'
    } else return 'issue-state-closed'
  }

  return (
    <div className='issue-list'>
      <div>{issues.map(issue => {
        const user = issue.repository_url.split('/')[4]
        const repo = issue.repository_url.split('/')[5]

        return (
          <div 
            key={issue.id} 
            className='issue-list-item' 
          >
            <span className='issue-list-repo'>{user}/{repo}</span> 
            <span className='issue-title' onClick={() => openIssue(issue)}>
              {issue.title}</span>
            <div className='issue-list-user'>
                #{issue.number} opened by {issue.user.login} on&nbsp;
              {convertDate(issue.created_at, 'noTime')}
              <span className={issueState(issue.state)}>{issue.state}</span>
              <span className='issue-comments'>{issue.comments}&nbsp; 
                {<i className="far fa-comment"></i>}</span>
              <span>{issue.labels.length > 0 ? 
                issue.labels.map((label,index) => {
                  return <span className='issue-list-label' key={index}>
                    {label.name}
                  </span>}) : ''}
              </span>
            </div>
          </div>)}
      )}
      </div>
    </div>
  )
}

ShowIssues.propTypes = {
  issues: PropTypes.array,  
  setShowIssue:PropTypes.func,
  setIssue:PropTypes.func
}

export default ShowIssues