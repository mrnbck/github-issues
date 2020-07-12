import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import timeStamp from '../helpers/timeStamp'
import convertDate from '../helpers/convertDate'
import axios from 'axios'

const ShowComments = ({ 
  setCommentsList,
  commentsList,
  user
}) => {    
   
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

  const styleButtonBar = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }

  const styleCancelButton = {
    visibility: 'hidden',
    height: '0px',
    alignSelf: 'end',
    marginRight: '10px',
  }

  const handleUpdateComment = async (changedComment) => {
    const regex = /repos\/([\D]|[\w])+/
    const url=`/api/${changedComment.url.match(regex)[0]}/`

    const commentBody = {
      body: updateComment
    }

    const time = timeStamp()

    const commentObject = {
      user: {
        login: user
      },
      body: updateComment,
      created_at: time
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
    const url = `/api/${commentUrl.match(regex)[0]}`

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
                {comment.updated_at > comment.created_at ? 
                  convertDate(comment.updated_at) : 
                  convertDate(comment.created_at)}
                {comment.updated_at !== comment.created_at ? 
                  <i>&#40;edited&#41;</i>:''}</span>
              <span>
              </span>
              <span>
                {user===comment.user.login && comment.url ? (
                  <span>
                    <i className="fas fa-pen comment-icon"
                      onClick={() => hideShowEditor(comment)}
                    ></i>
                    <i className="fas fa-trash-alt comment-icon" 
                      onClick={() => handleDeleteComment(comment.url)}
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
                className='button cancel-button'
                id={`${comment.id}_button`}
                style={styleCancelButton}
                onClick={() => hideShowEditor(comment)}
              >Cancel
              </button>
              <button 
                className='button comment-button'
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

export default ShowComments