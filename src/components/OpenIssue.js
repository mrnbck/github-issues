import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import '@fortawesome/fontawesome-free/css/all.css'

const OpenIssue = ({ 
  issue, showIssue, setShowIssue, 
  currentPage, myIssues, setIssue }) => {

  const history = useHistory()
  const [commentsList, setCommentsList] = useState([])
  const [login, setLogin] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [user, setUser] = useState('')
  const [updateComment, setUpdateComment] = useState('')
  const [changeMode, setChangeMode] = useState(false)
  
  const styleListTitle = {
    borderBottom: '1px solid #cbcbcb',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between'
  }

  const styleListItem = {
    padding: '5px 25px 15px'
  }

  const styleNoComments = {
    margin: '30px 0px',
    padding: '30px',
    border: '1px solid #cbcbcb'
  }

  const styleUpdateCommentButton = {
    visibility: 'hidden',
    height: '0px',
    alignSelf: 'end',
    marginRight: '10px',
  }

  const styleLoginButton = {
    marginLeft: '20px'
  }

  const styleButtonBar = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }

  const styleCancelButton = {
    backgroundColor: '#808080',
    visibility: 'hidden',
    height: '0px',
    alignSelf: 'end',
    marginRight: '10px',
  }

  const styleIssueState = {
    backgroundColor: '#28a745',
    padding: '7px 19px',
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

  const fetchComments = async () => {
    //check here if the user is already logged in. 
    
    const checkLogin = await axios.get('http://localhost:3001/checkLogin', 
      { withCredentials: true }).catch(error => error)
    setLogin(checkLogin.data)

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

  //get authenticated user
  useEffect(() => {
    
    const url = 'http://localhost:3001/user'

    const fetchUser = async () => {
      try {
        const user = await axios(url, { withCredentials: 'true' })
        setUser(user.data)
      } catch(error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  const convertMonth = month => {
    
    const months = {
      '01' : 'Jan',
      '02' : 'Feb',
      '03' : 'Mar',
      '04' : 'Apr',
      '05' : 'May',
      '06' : 'Jun',
      '07' : 'Jul',
      '08' : 'Aug',
      '09' : 'Sep',
      '10' : 'Oct',
      '11' : 'Nov',
      '12' : 'Dec'
    }

    return months[month]
  }

  const convertDate = (createdAt, noTime) => {

    const regex = /([^-|T|Z])+/g
    const date = createdAt.match(regex)
    const year = date[0]
    const month = convertMonth(date[1])
    const day = date[2]
    const time = date[3]
    if (noTime) {
      return `${year} ${month} ${day}`
    } else return `${year} ${month} ${day} at ${time}`
  }

  if(showIssue) {
    const close = () => {
      setShowIssue(false)
      myIssues ? 
        history.push(`/my-issues/${currentPage}`) : 
        history.push(`/issues/${currentPage}`)
    }

    const showComments = () => {      

      if (commentsList.length === 0) {

        return (
          <div style={styleNoComments}>No comments yet</div>
        )
      } else return (
        <div>
          <ul>{commentsList.map((comment, index) => {

            return (              
              <li className='comments-list' key={index}>
                <div style={styleListTitle} className='comment-header'>
                  <span><b>{comment.user.login}</b> on&nbsp;
                    {convertDate(comment.created_at)}</span>
                  <span>
                    {user===comment.user.login ? (
                      <span>
                        <i className="fas fa-pen comment-icon"
                          onClick={() => hideShowEditor(comment)}
                          style={styleFontColor}
                        ></i>
                        <i className="fas fa-trash-alt comment-icon" 
                          onClick={() => handleDeleteComment(comment.url)}
                          style={styleFontColor}
                        ></i>
                      </span>) : ''}
                  </span>
                </div>
                <textarea 
                  className='update-comment' 
                  id={`${comment.id}_textarea`} 
                  value={updateComment} 
                  onChange={updateCommentOnChange}>
                </textarea>
                <div style={styleButtonBar}>
                  <button 
                    className='close-button'
                    id={`${comment.id}_button`}
                    style={styleCancelButton}
                    onClick={() => hideShowEditor(comment)}
                  >Cancel
                  </button>
                  <button 
                    className='close-button'
                    id={`${comment.id}_cancel`}
                    style={styleUpdateCommentButton}
                    onClick={() => handleUpdateComment(comment)}
                  >Comment
                  </button>
                </div>
                <div style={styleListItem} id={`${comment.id}_list`}>
                  <ReactMarkdown source={comment.body} />
                </div>
              </li>              
            )
          })}</ul>
        </div>
      )
    }

    const handleUpdateComment = async (changedComment) => {
      const regex = /repos\/([\D]|[\w])+/
      const url=`http://localhost:3001/${changedComment.url.match(regex)[0]}/`

      const commentBody = {
        body: updateComment
      }

      
      const currentTime = new Date()
      const year = currentTime.getFullYear()
      const month = currentTime.getMonth() > 9 ? 
        currentTime.getMonth()+1 : `0${currentTime.getMonth()+1}`
      
      const day = currentTime.getDate() > 9 ? 
        currentTime.getDate() : `0${currentTime.getDate()}`

      const hours = currentTime.getHours() > 9 ? 
        currentTime.getHours() : `0${currentTime.getHours()}`

      const minutes = currentTime.getMinutes() > 9 ? 
        currentTime.getMinutes() : `0${currentTime.getMinutes()}`

      const seconds = currentTime.getSeconds() > 9 ? 
        currentTime.getSeconds() : `0${currentTime.getSeconds()}`


      const timeStamp=`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`

      const commentObject = {
        user: {
          login: user
        },
        body: updateComment,
        created_at: timeStamp
      }
      
      try {
        await fetch(url, { 
          method: 'PATCH',
          body: JSON.stringify(commentBody),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      } catch(error) {
        console.log(error)
      }
      hideShowEditor(changedComment)
      const newCommentsList = commentsList.map(comment => {
        if (comment.id === changedComment.id) {
          return commentObject 
        } else return comment
      })
      setCommentsList(newCommentsList)
    }


    const handleSubmitComment = async () => {
      const regex = /repos\/([\D]|[\w])+/
      const url = `http://localhost:3001/${issue.comments_url.match(regex)[0]}/`

      const comment = {
        body: newComment
      }
      
      try {
        await fetch(url, { 
          method: 'POST',
          body: JSON.stringify(comment),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        })
      } catch(error) {
        console.log(error)
      }
      setNewComment('')
      setCommentsList(commentsList.concat(newComment))
    }

    const hideShowEditor = async (comment) => {
      setUpdateComment(comment.body)
      if (!changeMode) {
        setChangeMode(true)
        document.getElementById(`${comment.id}_textarea`)
          .style.visibility = 'visible'
        document.getElementById(`${comment.id}_textarea`)
          .style.padding = '10px'
        document.getElementById(`${comment.id}_textarea`)
          .style.margin = '10px'
        document.getElementById(`${comment.id}_textarea`)
          .style.height = '200px'
      
        document.getElementById(`${comment.id}_list`)
          .style.visibility = 'hidden'
        document.getElementById(`${comment.id}_list`)
          .style.padding = '0px'
        document.getElementById(`${comment.id}_list`)
          .style.height = '0px'

        document.getElementById(`${comment.id}_button`)
          .style.visibility = 'visible'
        document.getElementById(`${comment.id}_button`)
          .style.height = 'auto'
        document.getElementById(`${comment.id}_button`)
          .style.marginBottom = '10px'
        document.getElementById(`${comment.id}_cancel`)
          .style.visibility = 'visible'
        document.getElementById(`${comment.id}_cancel`)
          .style.height = 'auto'
        document.getElementById(`${comment.id}_cancel`)
          .style.marginBottom = '10px'
      }
      if(changeMode) {
        setChangeMode(false)
        document.getElementById(`${comment.id}_textarea`)
          .style.visibility = 'hidden'
        document.getElementById(`${comment.id}_textarea`)
          .style.padding = '0px'
        document.getElementById(`${comment.id}_textarea`)
          .style.margin = '0px'
        document.getElementById(`${comment.id}_textarea`)
          .style.height = '0px'
              
        document.getElementById(`${comment.id}_list`)
          .style.visibility = 'visible'
        document.getElementById(`${comment.id}_list`)
          .style.padding = '5px 25px 15px'          
        document.getElementById(`${comment.id}_list`)
          .style.height = 'auto'

        document.getElementById(`${comment.id}_button`)
          .style.visibility = 'hidden'
        document.getElementById(`${comment.id}_button`)
          .style.height = '0px'
        document.getElementById(`${comment.id}_button`)
          .style.marginBottom = '0px'
        document.getElementById(`${comment.id}_cancel`)
          .style.visibility = 'hidden'
        document.getElementById(`${comment.id}_cancel`)
          .style.height = '0px'
        document.getElementById(`${comment.id}_cancel`)
          .style.marginBottom = '0px'
      }   
    }

    const updateCommentOnChange = (event) => {
      setUpdateComment(event.target.value)
    }

    const handleDeleteComment = async (commentUrl) => {

      const regex = /repos\/([\D]|[\w])+/
      const url = `http://localhost:3001/${commentUrl.match(regex)[0]}`

      const idRegex = /([^/])+/g
      const urlArray = commentUrl.match(idRegex)
      const id = urlArray[urlArray.length-1]
      
      const del = window.confirm('Do you really want to delete this comment?')
      if (del) {
        try {
          await axios.delete(url, { withCredentials: true })
          setCommentsList(commentsList.filter(comment => 
            comment.id !== Number(id) ) 
          )
        } catch(error) {
          console.log(error)
          setCommentsList(commentsList.filter(comment => 
            comment.id !== Number(id) ) )
        } 
      } 
    }

    const handleComment = (event) => {
      event.preventDefault()
      setNewComment(event.target.value)
    }
     
    return (
      <div>
        <div className='display-issue'>
          <h1>{issue.title} #{issue.number}</h1>
          <div style={styleIssueHeader}>
            <span style={styleIssueState}>{issue.state}</span>
            <span style={styleFontColor}>
              {issue.user.login} opened this issue on&nbsp;
              {convertDate(issue.created_at, 'noTime')} |&nbsp;
              {issue.comments} {issue.comments > 1 ? 'comments' : 'comment'}
            </span>
          </div>
          <br></br>
          <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
            {issue.html_url}</a>
          <div className='issue-content'>
            <div className='issue-main'>
              <div className='issue-body containers'>
                <ReactMarkdown source={issue.body} />
              </div>
              <div>
                <div>{showComments()}</div>
              </div>                    
              {!login ? (
              //if the user is not logged in yet, show Login button
                <div className='containers'>
                  <span>To comment please login to GitHub first</span>
                  <button style={styleLoginButton} className='close-button'>
              Login</button>
                </div>) :
              //if user is logged in show comment box.
                (<div className='comments-container'>
                  <textarea 
                    placeholder='Leave a comment' 
                    onChange={handleComment}
                    value={newComment}>
                  </textarea>
                  <button 
                    className='close-button' 
                    onClick={handleSubmitComment}>Comment
                  </button>
                </div>)}
              <button 
                className='close-button' 
                onClick={close}>
          Close
              </button>
            </div>  
            <div className='sidebar'>
              <div style={styleFontColor}>Assigned To: </div>
              <div className='metadata'>{issue.assignee ? 
                issue.assignee.login : 'None'}                
              </div>
              <div style={styleFontColor}>Labels </div>
              <div className='metadata'>{issue.labels.map(label => {
                return label.name})}
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
  currentPage: PropTypes.string,
  myIssues: PropTypes.bool,
  setIssue: PropTypes.func
}

export default OpenIssue