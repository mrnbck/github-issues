import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import '@fortawesome/fontawesome-free/css/all.css'
import { 
  BrowserRouter as Router, Link } from 'react-router-dom'
import convertDate from '../helpers/convertDate'
import fetchComments from '../helpers/fetchComments'
import handleSubmitComment from '../helpers/handleSubmitComments'
import ShowComments from './ShowComments'

const OpenIssue = ({ 
  issue, showIssue, setShowIssue, 
  currentPage, myIssues, setIssue }) => {

  const history = useHistory()
  const [commentsList, setCommentsList] = useState([])
  const [login, setLogin] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [user, setUser] = useState('')
  
  //refresh issue when opening
  useEffect(()  => {

    //add try/catch in case I receive a 403
    const refreshIssue = async () => {     
      try {
        const getIssue = await axios.get(issue.url)      
        setIssue(getIssue.data)
      } catch(error) {
        console.log(error)
      }
    }
    refreshIssue()
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {    
    fetchComments(
      setUser, 
      setLogin, 
      issue, 
      setCommentsList, 
      newComment, 
      setNewComment)
    // eslint-disable-next-line
  },[])

  //go back to issue list
  useEffect(() => {
    if (!showIssue) {
      myIssues ? 
        history.push(`/my-issues/${currentPage}`) : 
        history.push(`/issues/${currentPage}`)
    }
  })

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
      myIssues ? 
        history.push(`/my-issues/${currentPage}`) : 
        history.push(`/issues/${currentPage}`)
        
    }

    const handleComment = (event) => {
      event.preventDefault()
      setNewComment(event.target.value)
    }

    const handleLogin = async (event) => {
      event.preventDefault()
      const response = await fetch('/api/login')
      const url = await response.text()
  
      /*window.open(url,
        'Github Login',
        'menubar=no,location=no,resizable=no,'+
        'scrollbars=no,status=no,width=700,'+
        'height=726'
      )*/
      window.location.assign(url)
    }

    const issueState = (state) => {
      if (state === 'open') {
        return 'issue-state-open'
      } else return 'issue-state-closed'
    }

    return (
      <div>
        <div className='display-issue'>
          <i className="fas fa-arrow-left go-back"
            onClick={() => close() }></i>
          <h1>{issue.title} #{issue.number}</h1>
          <div className='issue-header'>
            <span className={issueState(issue.state)}>{issue.state}</span>
            <span className='font-color-grey'>
            &nbsp;{issue.user.login} opened this issue on&nbsp;
              {convertDate(issue.created_at, 'noTime')} |&nbsp;
              Comments: {commentsList.length} 
            </span>
            <a href={issue.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='go-to-github'>View On Github
            </a>
          </div>
          <div className='issue-content'>
            <div className='issue-main'>
              <div className='issue-body containers'>
                <ReactMarkdown source={issue.body} />
              </div>
              <div>
                <div>
                  {<ShowComments   
                    setCommentsList={setCommentsList} 
                    commentsList={commentsList}
                    user={user}
                  />}
                </div>
                <div style={{ textAlign: 'end' }}>
                  <i className='fas fa-sync refresh-icon' onClick={() => 
                    fetchComments( 
                      setUser, 
                      setLogin, 
                      issue, 
                      setCommentsList)}>
                  </i>
                </div>
              </div>                    
              {!login ? (
              //if the user is not logged in yet, show Login button
                <div className='containers'>
                  <span>To comment please login to GitHub first</span>
                  <Router>
                    <Link to='/login'>        
                      <button 
                        style={{ marginLeft: '20px' }}
                        className='button login-button'
                        onClick={handleLogin}>Login
                      </button>
                    </Link>
                  </Router>
                </div>) :
              //if user is logged in show comment box.
                (<div className='comments-container'>
                  <textarea 
                    placeholder='Leave a comment' 
                    onChange={handleComment}
                    value={newComment}>
                  </textarea>
                  <button 
                    className='button comment-button' 
                    onClick={() => handleSubmitComment(
                      issue, 
                      user, 
                      commentsList, 
                      setCommentsList,
                      newComment, 
                      setNewComment)}>
                      Comment
                  </button>
                </div>)}
              <button 
                className='button back-button' 
                onClick={close}>
                <i className="fas fa-arrow-left"></i>
              </button>
            </div>  
            <div className='sidebar'>
              <div className='font-color-grey'>Assigned To: </div>
              <div className='metadata'>{issue.assignee ? 
                issue.assignee.login : 'None'}                
              </div>
              <div className='font-color-grey'>Labels </div>
              <div className='metadata'>{issue.labels.length > 0 ? 
                issue.labels.map((label,index) => {
                  return <div key={index}>{label.name}</div>}) : 'None'}
              </div>
              <div className='font-color-grey'>Milestone </div>
              <div className='metadata'>{issue.milestone ? 
                issue.milestone.title : 'None'}</div>
            </div>
          </div>         
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
  currentPage: PropTypes.number,
  myIssues: PropTypes.bool,
  setIssue: PropTypes.func
}

export default OpenIssue