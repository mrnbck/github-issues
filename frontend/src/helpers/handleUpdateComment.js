import timeStamp from './timeStamp'
import hideShowEditor from './hideShowEditor'

const handleUpdateComment = async (
  changedComment,
  updateComment, 
  setUpdateComment,
  changeMode,
  setChangeMode,
  commentsList,
  setCommentsList,
  user ) => {
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

export default handleUpdateComment