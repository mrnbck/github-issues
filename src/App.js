import React, { useState, useEffect, createRef } from 'react'
import axios from 'axios'
import './App.css'
import IssueList from './components/IssueList'

const App = () => {

  const [filter, setFilter]= useState('')
  const [issues, setIssues] = useState([])
  const [url, setUrl] = useState('https://api.github.com/search/issues?' + 
  `q=${filter}+label:bug+language:react+state:open&sort=created&order=asc&` +
  'per_page=25')
  const [paginationLinks, setPaginationLinks] = useState('')
  const [currentPage, setCurrentPage] = useState('')
    
  let input = createRef()
 
  const handleSubmit = (event) => {
    event.preventDefault()
    setFilter(input.value)
  }

  useEffect(() => {
    axios.get(url)
      .then(response => {
        setIssues(response.data.items)
        setPaginationLinks(response.headers.link)
        console.log(response.data) 
      })
  },[url, filter])

  const pagination = rel => {
    
    console.log('linkheader', paginationLinks)

    const linkRegex = /<([^>]+)/g
    const relRegex = /rel="([^"]+)/g
    const linkArray = []
    const relArray = []
    let temp = 0

       
    while ((temp = linkRegex.exec(paginationLinks)) !== null) {
      linkArray.push(temp[1])
    }

    while ((temp = relRegex.exec(paginationLinks)) !== null) {
      relArray.push(temp[1])
    }

    const result = relArray.reduce((object, value, index) => {
      object[value] = linkArray[index]
      return object
    }, {})

    console.log('result', result[rel])

    setUrl(result[rel])

    const pageRegex = /&page=[0-9]+/g
    const helper = pageRegex.exec(result[rel])[0].split('=')[1]
    
    setCurrentPage(helper)
  }

  const navigation = () => (
    
    <div>
      <div onClick={() => pagination('prev')}>Previous </div>
      <div onClick={() => pagination('first')}>First </div>
      <div onClick={() => pagination('next')}>Next </div>
      <div onClick={() => pagination('last')}>Last </div>
    </div>
  )
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Search: </label>
        <input type='text' ref={(element) => input = element}></input>
        <button type='submit'>OK</button>
      </form>
      <br></br>
      {navigation()}
      
      <h3>Issues</h3>
      <div></div>
      
      <div>{<IssueList filter={filter} issues={issues} />}</div>
    </div>
  )
}

export default App
