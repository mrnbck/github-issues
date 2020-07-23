import axios from 'axios'

const fetchComments = async (setUser, setLogin, issue, setCommentsList) => {
  
  const url = '/api/user'
  //get authenticated user
  const fetchUser = async () => {
    try {
      const user = await axios(url, { withCredentials: 'true' })
      
      if (user.data) {
        setUser(user.data)
        setLogin(true)
      }
    } catch(error) {
      console.log(error)
    }
  }

  fetchUser()

  try { //if rate limit is exceeded none of the following calls will succeed
    const regex = /repos\/.+/
    const issueCommentsUrl = `/api/${issue.comments_url.match(regex)[0]}/`
    
    const issueComments = await axios
      .get(issueCommentsUrl, { withCredentials: 'true' }) 
    
    if (issue.pull_request) {
      const pullUrl = `/api/${issue.pull_request.url
        .match(regex)[0]}`+'/comments'    

      const pullComments = await axios
        .get(pullUrl, { withCredentials: 'true' }) 
      
      const commitsUrl = `/api/${issue.pull_request.url
        .match(regex)[0]}`+'/commits' 
      const commits = await axios
        .get(commitsUrl, { withCredentials: 'true' })
        
      const commitMessages = commits.data.map(commit => {
        if (commit.author !== null && commit.commit.message && commit.url) {
          try {
            const commitObject = {
              user: {
                login: commit.author.login
              },
              created_at: commit.commit.author.date,
              updated_at: commit.commit.author.date,
              body: commit.commit.message,
              url: commit.url,
              type: 'commit'
            } 
            return commitObject
          } catch(error) {
            console.log(error)
          }
        } return ''
      })
      
      if (commitMessages[0] !== undefined) {
        setCommentsList(issueComments.data
          .concat(pullComments.data, commitMessages).sort((a,b) => {
            //console.log(new Date(a.created_at) - new Date(b.created_at))
            return new Date(a.created_at) - new Date(b.created_at)
          } ) 
        ) }
      else {
        setCommentsList(issueComments.data
          .concat(pullComments.data).sort((a,b) => {
          //console.log(new Date(a.created_at) - new Date(b.created_at))
            return new Date(a.created_at) - new Date(b.created_at)
          } ) 
        )
      } 
    }
    else setCommentsList(issueComments.data)
  } catch (error) {
    console.log(error)
    if (error.response && error.response.status === 403) {
      setCommentsList(['rate limit exceeded'])
    }
    
  }   
}

export default fetchComments