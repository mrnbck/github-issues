require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some  browsers choke on 204
  credentials: true
}

app.use(cors(corsOptions))

app.get('/login', async (req, res) => {
  // eslint-disable-next-line no-unused-vars

  const client = process.env.CLIENT
  const redirect = process.env.REDIRECT
  const state = process.env.STATE
  const scope = 'scope=repo'
  const baseUrl = 'https://github.com/login/oauth/authorize?'

  const fullUrl = baseUrl + client + redirect + '&' + scope + state

  res.send(fullUrl)
})

// eslint-disable-next-line no-unused-vars
app.get('/oauth-token/:code/:state', async (req, res) => {
  
  //console.log(req.params.code)

  const client = process.env.CLIENT
  const secret = process.env.SECRET

  if (`&state=${req.params.state}` === process.env.STATE) {

    const url = 'https://github.com/login/oauth/access_token' 
    const fullUrl = `${url}?${client}&${secret}&code=${req.params.code}`
  
    const result = await axios.post(fullUrl)
    console.log(result.status, ': ', result.statusText)
    const token = result.data.match(/access_token=([^&]+)/)[1]
  
    res.cookie('user_session', token, 
      { httpOnly: true, path: '/', secure: true, sameSite: 'lax' })
    //res.setHeader('Set-Cookie', 
    //  [`user_session=${token}; Path=/; secure; HttpOnly; SameSite=Lax`])
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

    res.send(token)
  }
  else return res.sendStatus(403)
})

app.get('/issues/:query', async (req, res) => {
  const query = req.params.query
  const url = 'https://api.github.com/search/issues?q='
  const fullUrl = url + query
  
  const regex=/user_session=([^;]+)/
  if (req.headers.cookie) {
    const user_session = req.headers.cookie.match(regex)[1]

    const config = {
      headers: { authorization: 'token ' + user_session },
    }
    const result = await axios.get(fullUrl, config)
    //console.log('headers', result.headers)
    //console.log('data', result.data)

    const data = result.data
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.status(200)
    res.send(data)
  }
  else {
    const result = await axios.get(fullUrl)
    const data = result.data
    res.status(200)
    res.send(data)
  }  
})

app.get('/my-issues/:id', async (req, res) => {
  const regex=/user_session=([^;]+)/
  const user_session = req.headers.cookie.match(regex)[1]

  const config = {
    headers: { authorization: 'token ' + user_session },
  }

  const myIssues = await axios.get('https://api.github.com/issues', config)
  const data = myIssues.data

  res.status(200)
  res.send(data) 
})

app.get('/checkLogin', async (req, res) => {
  
  const regex=/user_session=([^;]+)/
  const user_session = req.headers.cookie.match(regex)[1]

  //no longer needed because I set it globally?
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

  if (user_session) {
    res.send('true')
  } else res.send('false') 
})

app.get('/user', async (req, res) => {

  const regex=/user_session=([^;]+)/
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
    res.sendStatus(400)
  }
})

app.post('/repos/:owner/:repo/issues/:id/comments', async (req,res) => {
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

app.patch('/repos/:owner/:repo/issues/comments/:id', async (req,res) => {
  const owner = req.params.owner
  const repo = req.params.repo
  const id = req.params.id

  console.log(req.url)

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
    console.log(error)
    res.sendStatus(400)
  }

})

app.delete('/repos/:owner/:repo/issues/comments/:id', async (req,res) => {
  const owner = req.params.owner
  const repo = req.params.repo
  const id = req.params.id

  //res.setHeader('Access-Control-Allow-Credentials', true)
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

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

const unknownEndpoint = (request, response) => {
  console.log(request.url)
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})