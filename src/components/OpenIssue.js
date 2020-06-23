import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const OpenIssue = ({ issue, showIssue, setShowIssue, currentPage }) => {

  const history = useHistory()
  const [comments, setComments] = React.useState([])

  useEffect(() => {
    const fetchComments = async () => {
      const promise = await axios.get(issue.comments_url)
      const commentsBody = promise.data.map(comment => comment.body)
      setComments(commentsBody) 
    }   
    fetchComments().catch(error => error)
    // eslint-disable-next-line
  },[])

  //when user goes back with browser back button, close the ticketview
  useEffect(() => {
    let regex = /id\/([\d])+/
    if (regex.exec(window.location) === null) {
      setShowIssue(false)
    }
  })

  if(showIssue) {
    const close = () => {
      setShowIssue(false)
      history.push(`/issues/${currentPage}`)
    }
     
    return (
      <div>
        <div id='display-issue'>
          <h3>{issue.title}</h3>
          <div>{issue.url}</div>
          <div>{issue.state}</div>
          <div>{issue.body}</div>
          <div>{issue.created_at}</div>
          <h2>comments</h2>
          <ul>{comments.map((comment, index) => {
            return (              
              <li key={index}>{comment}</li>              
            )
          }
          )}</ul>
          <h2>end of comments</h2>
          <div>{issue.comments_url}</div>
          <button onClick={close}>close</button>           
        </div>
      </div>
    )
  }

  return (
    <span></span>
  )
}

OpenIssue.propTypes = {
  issue:PropTypes.object,
  showIssue: PropTypes.bool,
  setShowIssue:PropTypes.func,
  currentPage: PropTypes.string
}

export default OpenIssue