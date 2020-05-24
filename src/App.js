import React, { useState, useEffect, createRef } from 'react'
import axios from 'axios'
import './App.css'
import { 
  BrowserRouter as Router, Redirect } from 'react-router-dom'
import Navigation from './components/Navigation'
import '@fortawesome/fontawesome-free/css/all.css'


const App = () => {

  const [filter, setFilter]= useState('')
  const [issues, setIssues] = useState([])
  const [url, setUrl] = useState('')  
  const [paginationLinks, setPaginationLinks] = useState('')
  const [currentPage, setCurrentPage] = useState('1')
  const [totalCount, setTotalCount] = useState('')
    
  let input = createRef()
  let baseUrl = 'https://api.github.com/search/issues?q='


  //if search term has been entered, URL is not equal to baseUrl anymore.
  //get the information from the API with response.data.items, headers.link and 
  //total_count
  useEffect(() => {
    if (url === undefined) {
      //do nothing
    } else {
      
      axios.get(url)
        .then(response => {
          if (filter !== '') {
            console.log('----------------------------------------------------')
            console.log('App useEffect()')
            setIssues(response.data.items)
            setPaginationLinks(response.headers.link)
            setTotalCount(response.data.total_count)
            window.scrollTo(0, 0)
            console.log('url',url)
            console.log('----------------------------------------------------')
          }
        })
        .catch(() => {          
          setIssues([])
          return (
            <Router>
              <Redirect to='/' />
            </Router>)
        })
        // eslint-disable-next-line
    }},[url])

  
  //when submitting a search, set the new URL and remember the search term 
  //as filter. 
  const handleSubmit = (event) => {
    event.preventDefault()
    setCurrentPage('1')
    setUrl(baseUrl+input.value+'&page=1')
    //console.log(baseUrl+input.value+'&page=1')
    setFilter(input.value)
  }

  ///when no search term is entered, go back to root
  const redirectAfterSearch = () => {
    
    if (filter === '') {
      return (
        <Router>
          <Redirect to='/' />
        </Router>)
    }
    else return (
      <Router>
        <span>{console.log('redirect')}
          <Redirect to={`/issues/${Number(currentPage)}`} /></span>
      </Router>)
  }

  return (
    <div className='page'>
      
      <div className='menu'>
        <form onSubmit={handleSubmit} className='searchbar'>
          <label>Search: </label>
          <input type='text' ref={(element) => input = element}
            className='search-input'
          ></input>
        </form> 
        <i className="fas fa-bars"></i>
        <span id='repositories'>Repositories</span>
        <span>Users</span>
      </div>
      {redirectAfterSearch()}
      <br></br>
      <Navigation 
        filter={filter}
        totalCount={totalCount}
        currentPage={currentPage}
        issues={issues}
        paginationLinks={paginationLinks}
        setUrl={setUrl}
        setCurrentPage={setCurrentPage}
      />
      
    </div>
  )
}

export default App
