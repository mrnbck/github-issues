import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import convertDate from '../helpers/convertDate'
import hideShowEditor from '../helpers/hideShowEditor'
import PropTypes from 'prop-types'
import handleUpdateComment from '../helpers/handleUpdateComment'
import handleDeleteComment from '../helpers/handleDeleteComment'

const ShowComments = ({ 
  setCommentsList,
  commentsList,
  user
}) => {    
   
  const [updateComment, setUpdateComment] = useState('')
  const [changeMode, setChangeMode] = useState(false)

  const updateCommentOnChange = (event) => {
    setUpdateComment(event.target.value)
  }

  if (commentsList.length === 0) {
    
    return (
      <div className='no-comments'>No comments yet</div>
    )
  } else return (
    <div>
      <ul>{commentsList.map((comment, index) => {
        //some comments are empty, so we don't want to return anything
        if (!comment.user) {
          return
        }
        if (comment.type === 'commit') {
          return (
            <span className='commit-message font-color-grey' key={index}>
             --&gt;&nbsp; <b>{comment.user.login}</b>&nbsp;added a commit: 
             &nbsp;{comment.body}
            </span> )
        }
        return (
          <li className='comments-list' key={index}>
            <div className='comment-header'>
              <span><b>{comment.user ? comment.user.login : ''}</b> on&nbsp;
                {comment.updated_at && comment.created_at ?
                  convertDate(comment.created_at) :
                  ''}
              </span>
              <span>
              </span>
              <span>{comment.type}</span>
              <span>
                {!comment.user ? '' :
                  user===comment.user.login && comment.url ? (
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
                        onClick={() => handleDeleteComment(
                          comment.url, 
                          setCommentsList, 
                          commentsList)}
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
                onClick={() => handleUpdateComment( 
                  comment,
                  updateComment, 
                  setUpdateComment,
                  changeMode,
                  setChangeMode,
                  commentsList,
                  setCommentsList,
                  user)                 
                }
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