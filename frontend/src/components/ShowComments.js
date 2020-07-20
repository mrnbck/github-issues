import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import timeStamp from '../helpers/timeStamp'
import convertDate from '../helpers/convertDate'
import hideShowEditor from '../helpers/hideShowEditor'
import PropTypes from 'prop-types'
import axios from 'axios'

const ShowComments = ({ 
  setCommentsList,
  commentsList,
  user
}) => {    
   
  const [updateComment, setUpdateComment] = useState('')
  const [changeMode, setChangeMode] = useState(false)

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
    hideShowEditor(changedComment, setChangeMode, changeMode, setUpdateComment)
    const newCommentsList = commentsList.map(comment => {
      if (comment.id === changedComment.id) {
        return commentObject 
      } else return comment
    })
    setCommentsList(newCommentsList)
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
      <div className='no-comments'>No comments yet</div>
    )
  } else return (
    <div>
      <ul>{commentsList.map((comment, index) => {
        return (
          //if comment.type === 'commit' 
          <li className='comments-list' key={index}>
            <div className='comment-header'>
              <span><b>{comment.user.login}</b> on&nbsp;
                {comment.updated_at > comment.created_at ? 
                  convertDate(comment.updated_at) : 
                  convertDate(comment.created_at)}
                {comment.updated_at !== comment.created_at ? 
                  <i>&#40;edited&#41;</i>:''}</span>
              <span>
              </span>
              <span>{comment.type}</span>
              <span>
                {user===comment.user.login && comment.url ? (
                  <span>
                    <i className="fas fa-pen comment-icon"
                      onClick={() => 
                        hideShowEditor(
                          comment, 
                          setChangeMode, 
                          changeMode, 
                          setUpdateComment)}
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
            <div className='comment-top-bar'>
              <button 
                className='button cancel-button'
                id={`${comment.id}_button`}
                onClick={() => 
                  hideShowEditor(
                    comment, 
                    setChangeMode, 
                    changeMode, 
                    setUpdateComment)}
              >Cancel
              </button>
              <button 
                className='button comment-button update-button'
                id={`${comment.id}_cancel`}
                onClick={() => handleUpdateComment(comment)}
              >Comment
              </button>
            </div>
            <div className='comments-padding' id={`${comment.id}_list`}>
              <ReactMarkdown source={comment.body} />
            </div>
          </li>              
        )
      })}</ul>
    </div>
  )
}

ShowComments.propTypes = {
  setUpdateComment:PropTypes.func,
  setChangeMode: PropTypes.func
}

export default ShowComments