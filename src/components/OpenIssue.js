import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import '@fortawesome/fontawesome-free/css/all.css'
import { 
  BrowserRouter as Router, Link } from 'react-router-dom'
import timeStamp from '../helpers/timeStamp'
import convertDate from '../helpers/convertDate'
import ShowComments from './ShowComments'

const OpenIssue = ({ 
  issue, showIssue, setShowIssue, 
  currentPage, myIssues, setIssue }) => {

  const history = useHistory()
  const [commentsList, setCommentsList] = useState([])
  const [login, setLogin] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [user, setUser] = useState('')
  
  const styleLoginButton = {
    marginLeft: '20px'
  }

  const styleIssueState = {
    backgroundColor: '#28a745',
    padding: '5px 15px',
    fontWeight: 'bold',
    borderRadius: '15px',
    color: 'white',
    marginRight: '10px',
    height: '18px',
    lineHeight: '20px',
    textTransform: 'uppercase'
  }

  const styleIssueHeader = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }

  const styleFontColor = {
    color: '#808080'
  }

  const styleRefreshIcon = {
    textAlign: 'end',
    marginBottom: '20px',
    cursor: 'pointer'
  }

  const fetchComments = async () => {
    //check here if the user is already logged in. 
    
    const url = '/api/user'
    //get authenticated user
    const fetchUser = async () => {
      try {
        const user = await axios(url, { withCredentials: 'true' })
        setUser(user.data)
        setLogin(true)
      } catch(error) {
        console.log(error)
      }
    }
    fetchUser()

    const promise = await axios.get(issue.comments_url)
    setCommentsList(promise.data)
  }

  //refresh issue when opening
  useEffect(()  => {

    const refreshIssue = async () => {
     
      const getIssue = await axios.get(issue.url)      
      setIssue(getIssue.data)
    }
    refreshIssue()
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {    
    fetchComments()
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

    const handleSubmitComment = async () => {
      const regex = /repos\/([\D]|[\w])+/
      const url = `/api/${issue.comments_url.match(regex)[0]}/`

      const time = timeStamp()

      const commentObject = {
        user: {
          login: user
        },
        body: newComment,
        created_at: time
      }

      try {
        await fetch(url, { 
          method: 'POST',
          body: JSON.stringify(commentObject),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      } catch(error) {
        console.log(error)
      }
      setNewComment('')
      console.log(commentsList)
      setCommentsList(commentsList.concat(commentObject))
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
     
    return (
      <div>
        <div className='display-issue'>
          <i className="fas fa-arrow-left go-back"
            onClick={() => close() }></i>
          <h1>{issue.title} #{issue.number}</h1>
          <div style={styleIssueHeader}>
            <span style={styleIssueState}>{issue.state}</span>
            <span style={styleFontColor}>
              {issue.user.login} opened this issue on&nbsp;
              {convertDate(issue.created_at, 'noTime')} |&nbsp;
              {issue.comments} {issue.comments > 1 ? 'comments' : 'comment'}
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
                <div>{<ShowComments   
                  setCommentsList={setCommentsList} 
                  commentsList={commentsList}
                  user={user}
                />}
                </div>
                <div style={styleRefreshIcon} onClick={() => fetchComments()}>
                  <i className="fas fa-sync"></i>
                </div>
              </div>                    
              {!login ? (
              //if the user is not logged in yet, show Login button
                <div className='containers'>
                  <span>To comment please login to GitHub first</span>
                  <Router>
                    <Link to='/login'>        
                      <button 
                        style={styleLoginButton} 
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
                    onClick={handleSubmitComment}>Comment
                  </button>
                </div>)}
              <button 
                className='button back-button' 
                onClick={close}>
                <i className="fas fa-arrow-left"></i>
              </button>
            </div>  
            <div className='sidebar'>
              <div style={styleFontColor}>Assigned To: </div>
              <div className='metadata'>{issue.assignee ? 
                issue.assignee.login : 'None'}                
              </div>
              <div style={styleFontColor}>Labels </div>
              <div className='metadata'>{issue.labels.length > 0 ? 
                issue.labels.map(label => {
                  return label.name}) : 'None'}
              </div>
              <div style={styleFontColor}>Milestone </div>
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