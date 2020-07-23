require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const path = require('path')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const client = `client_id=${process.env.CLIENT}`
const secret = `client_secret=${process.env.SECRET}`
const redirect = `&redirect_uri=${process.env.REDIRECT}`
const state = `&state=${process.env.STATE}`

app.get('/api/login', async (req, res) => {
  // eslint-disable-next-line no-unused-vars

  const scope = '&scope=repo'
  const baseUrl = 'https://github.com/login/oauth/authorize?'

  const fullUrl = baseUrl + client + redirect + scope + state

  res.send(fullUrl)
})

// eslint-disable-next-line no-unused-vars
app.get('/api/oauth-token/:code/:state', async (req, res) => {
  
  if (`&state=${req.params.state}` === state) {

    const url = 'https://github.com/login/oauth/access_token' 
    const fullUrl = `${url}?${client}&${secret}&code=${req.params.code}`
  
    try {
      const result = await axios.post(fullUrl)
      const token = result.data.match(/access_token=([^&]+)/)[1]
  
      res.cookie('user_session', token, 
        { httpOnly: true, path: '/', secure: true, sameSite: 'lax' })
      
      res.send(token)
    } 
    catch (error) {
      console.log(error)
      res.sendStatus(error.response.status)
    }
  }
  else return res.sendStatus(403)
})

app.get('api/logout', async (req, res) => {
  res.clearCookie('user_session', { 
    httpOnly: true, path: '/', secure: true, sameSite: 'lax' 
  })
  res.sendStatus(200)
})

//not needed anymore
/* app.get('/api/checkLogin', async (req, res) => {
  
  const regex=/user_session=([^;]+)/

  if (req.headers.cookie.match(regex) !== null) {

    res.status(200)
    res.send('true')
  } else {
    res.status(202).send('false')
  }
}
) */
    
app.get('/api/user', async (req, res) => {

  const regex=/user_session=([^;]+)/
  if (req.headers.cookie && req.headers.cookie.match(regex) !== null) {
    const user_session = req.headers.cookie.match(regex)[1]

    const config = {
      headers: { authorization: 'token ' + user_session },
    }
    try {
      const user = await axios.get('https://api.github.com/user', config)
      const data = user.data
    
      res.status(200)
      res.send(data.login) 
    } catch(error) {
      console.log(error)
      res.sendStatus(error.response.status)
    }
  } else res.status(202).send('false')
})

app.get('/api/issues/:query', async (req, res) => {
  const query = req.params.query
  const url = 'https://api.github.com/search/issues?q='
  const fullUrl = url + query

  try {
    const result = await axios.get(fullUrl, { auth: {
      username: process.env.CLIENT,
      password: process.env.SECRET
    }
    })

    const data = result.data
    console.log('Rate Limit remaining', 
      result.headers['x-ratelimit-remaining'])
    if (data.total_count === 0) {
      res.sendStatus(204)
    } else {
      res.status(200)
      res.send(data)
    }
  } catch (error) {
    console.log('/api/issues/:query', 
      error.response.status, error.response.statusText)
    if (error.response.status === 400) {
      res.sendStatus(204)
    } else res.sendStatus(error.response.status)
  }
})

app.get('/api/my-issues/:id', async (req, res) => {
  
  const regex=/user_session=([^;]+)/

  if (req.headers.cookie && req.headers.cookie.match(regex) !== null) {
    const user_session = req.headers.cookie.match(regex)[1]

    const config = {
      headers: { authorization: 'token ' + user_session },
    }

    try {
      const result = await axios.get('https://api.github.com/issues', config)
      const data = result.data
      console.log('Rate Limit remaining', 
        result.headers['x-ratelimit-remaining'])
      data.length > 0 ? res.status(200) : res.status(404)
      res.status(200)
      res.send(data) 
    } catch(error) {
      console.log('My Issues', error.response.status, '-', 
        error.response.statusText)
      res.status(error.response.status)
      res.send(error.error)
    }


  } 
})

app.get('/api/repos/:owner/:repo/issues/:id/comments', async (req, res) => {
  const owner = req.params.owner
  const repo = req.params.repo
  const id = req.params.id

  try {
    const result = await axios.get('https://api.github.com/repos/'+
    `${owner}/${repo}/issues/${id}/comments`, { auth: {
      username: process.env.CLIENT,
      password: process.env.SECRET
    }    
    })
    const data = result.data
    console.log('Rate Limit remaining', 
      result.headers['x-ratelimit-remaining'])
    data.length > 0 ? res.status(200) : res.status(404)
    res.status(200)
    res.send(data) 
  } catch(error) {
    error.response.status ? 
      res.sendStatus(error.response.status) :
      res.sendStatus(400)
  }
})

app.get('/api/repos/:owner/:repo/pulls/:id/comments', async (req, res) => {
  const owner = req.params.owner
  const repo = req.params.repo
  const id = req.params.id

  try {
    const result = await axios.get('https://api.github.com/repos/'+
    `${owner}/${repo}/pulls/${id}/comments`, { auth: {
      username: process.env.CLIENT,
      password: process.env.SECRET
    }
    })
    const data = result.data
    console.log('Rate Limit remaining', 
      result.headers['x-ratelimit-remaining'])
    data.length > 0 ? res.status(200) : res.status(404)
    res.status(200)
    res.send(data) 
  } catch(error) {
    console.log(error)
    res.sendStatus(error.response.status)
  }
})

app.get('/api/repos/:owner/:repo/pulls/:id/commits', async (req, res) => {
  const owner = req.params.owner
  const repo = req.params.repo
  const id = req.params.id

  try {
    const result = await axios.get('https://api.github.com/repos/'+
    `${owner}/${repo}/pulls/${id}/commits`, { auth: {
      username: process.env.CLIENT,
      password: process.env.SECRET
    }
    })
    const data = result.data
    console.log('Rate Limit remaining', 
      result.headers['x-ratelimit-remaining'])
    data.length > 0 ? res.status(200) : res.status(404)
    res.status(200)
    res.send(data) 
  } catch(error) {
    console.log(error)
    res.sendStatus(error.response.status)
  }
})

app.post('/api/repos/:owner/:repo/issues/:id/comments', async (req,res) => {
  const owner = req.params.owner
  const repo = req.params.repo
  const id = req.params.id

  const regex=/user_session=([^;]+)/
  const user_session = req.headers.cookie.match(regex)[1]

  const config = {
    headers: { authorization: 'token ' + user_session },
  }

  try {
    await axios.post('https://api.github.com/repos/'+
    `${owner}/${repo}/issues/${id}/comments`, req.body, config)
    res.sendStatus(200) 
  } catch(error) {
    console.log(error)
    res.sendStatus(400)
  }
})

app.patch('/api/repos/:owner/:repo/issues/comments/:id', async (req,res) => {
  const owner = req.params.owner
  const repo = req.params.repo
  const id = req.params.id

  const regex=/user_session=([^;]+)/
  const user_session = req.headers.cookie.match(regex)[1]

  const config = {
    headers: { authorization: 'token ' + user_session },
  }

  try {
    await axios.patch('https://api.github.com/repos/'+
    `${owner}/${repo}/issues/comments/${id}`, req.body, config)
    res.sendStatus(200) 
  } catch(error) {
    console.log('Update Comment', 
      error.response.status, error.response.statusText)
    res.sendStatus(400)
  }
})

app.delete('/api/repos/:owner/:repo/issues/comments/:id', async (req,res) => {
  const owner = req.params.owner
  const repo = req.params.repo
  const id = req.params.id

  const regex=/user_session=([^;]+)/
  const user_session = req.headers.cookie.match(regex)[1]

  const config = {
    headers: { authorization: 'token ' + user_session },
  }

  try {
    await axios.delete('https://api.github.com/repos/'+
    `${owner}/${repo}/issues/comments/${id}`, config)
    res.sendStatus(204) 
  } catch(error) {
    console.log(error)
    res.sendStatus(400)
  }
})

if (process.env.NODE_ENV === 'production') {
  var corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200, // some  browsers choke on 204
    credentials: true
  }
  app.use(cors(corsOptions))
 
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
} else {

  // eslint-disable-next-line no-redeclare
  var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some  browsers choke on 204
    credentials: true
  }
  app.use(cors(corsOptions))
  
}

const unknownEndpoint = (request, response) => {
  console.log('unknown endpoint', request.url)
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})