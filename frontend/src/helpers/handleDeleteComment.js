import axios from 'axios'

const handleDeleteComment = async(commentUrl,setCommentsList,commentsList) => {

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

export default handleDeleteComment