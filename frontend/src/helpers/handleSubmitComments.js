import timeStamp from './timeStamp'

const handleSubmitComment = async (
  issue, 
  user, 
  commentsList, 
  setCommentsList, 
  newComment, 
  setNewComment) => {
  const regex = /repos\/([\D]|[\w])+/
  const url = `/api/${issue.comments_url.match(regex)[0]}/`

  const time = timeStamp()

  const commentObject = {
    user: {
      login: user
    },
    body: newComment,
    created_at: time,
    updated_at: time
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
  setCommentsList(commentsList.concat(commentObject))
}

export default handleSubmitComment