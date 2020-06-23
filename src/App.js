import React, { useState, useEffect, createRef } from 'react'
import axios from 'axios'
import './App.css'
import { 
  BrowserRouter as Router, Redirect } from 'react-router-dom'
import Navigation from './components/Navigation'
import ExtendedSearch from './components/ExtendedSearch'
import '@fortawesome/fontawesome-free/css/all.css'


const App = () => {

  const [filter, setFilter]= useState('')
  const [issues, setIssues] = useState([])
  const [url, setUrl] = useState('')  
  const [paginationLinks, setPaginationLinks] = useState('')
  const [currentPage, setCurrentPage] = useState('1')
  const [totalCount, setTotalCount] = useState('')
  const [open, setOpen] = useState(false)
  const [qualifiers, setQualifiers] = useState([])
  const [showIssue, setShowIssue] = useState(false)
    
  let searchInput = createRef()
  let baseUrl = 'https://api.github.com/search/issues?q='

  //if search term has been entered, URL is not equal to baseUrl anymore.
  //get the information from the API with response.data.items, headers.link and 
  //total_count
  useEffect(() => {
    //console.log('url', url)
    if (url === undefined) {
      //do nothing
    } else {      
      axios.get(url)
        .then(response => {
          if ((filter !== '' || qualifiers.length > 0) && 
               Number(currentPage)>0 ) {
            setIssues(response.data.items)
            setPaginationLinks(response.headers.link)
            setTotalCount(response.data.total_count)
            setShowIssue(false)
            window.scrollTo(0, 0)
            console.log(response.data)
            //console.log('qualifiers in App',qualifiers)
            //console.log('url',url)
            //console.log('currentPage', Number(currentPage))
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
    if (qualifiers.length > 0) {
      setUrl(baseUrl+searchInput.value+'+'+qualifiers.join('')+'&page=1')
    }
    else setUrl(baseUrl+searchInput.value+'&page=1')
    setFilter(searchInput.value)
  }

  ///when no search term is entered, go back to root
  const redirectAfterSearch = () => {
    
    if (filter === '' && qualifiers.length === 0) {
      return (
        <Router>
          <Redirect to='/' />
        </Router>)
    }
    else return (
      <Router>
        <span>
          <Redirect to={`/issues/${Number(currentPage)}`} /></span>
      </Router>)
      
  }

  const extendedSearchBar = () => {
    if (!open) { 
      document.getElementById('open-extended').style.maxHeight = '2000px'
      document.getElementById('open-extended').style.transition = '0.3s'
      document.getElementById('extended-search-content').style.top = '42px'
      document.getElementById('extended-search-content')
        .style.transition = '0.3s'
      //document.getElementById('open-extended-icon').style.rotate = '90deg'
      window.scrollTo(0, 0)
      setOpen(true)}
    else {
      document.getElementById('open-extended').style.maxHeight = '0'
      document.getElementById('open-extended').style.transition = '0.2s'
      document.getElementById('extended-search-content').style.top = '-450px'
      document.getElementById('extended-search-content')
        .style.transition = '0.5s'
      //document.getElementById('open-extended-icon').style.rotate = '0deg'
      setOpen(false)
    }
  }

  return (
    <div className='page'>
      <div className='menu'>
        <form onSubmit={handleSubmit} >
          <label className='search-label'>Search: </label>
          <span>
            <input type='text' ref={(element) => searchInput = element}
              className='search-input'></input>
            <span className='search-input-extended' onClick={extendedSearchBar}
            >Extended</span>
            {/*<i className="fas fa-bars" onClick={extendedSearchBar}
              id='open-extended-icon' onMouseEnter={peakExtendedSearchBar}
              onMouseLeave={peakExtendedSearchBar}></i>*/}
          </span>
        </form> 
        {/*<span id='repositories'>Repositories</span>
        <span id='users'>Users</span>*/}
      </div>

      <div className='extended-search' id='open-extended'>
        <span id='extended-search-content'>
          <ExtendedSearch 
            qualifiers={qualifiers} 
            setQualifiers={setQualifiers}
            baseUrl ={baseUrl}
            filter = {filter}
            currentPage = {currentPage}
            setUrl={setUrl}
            setOpen={setOpen}
          />
        </span>
      </div>
      <span></span>
      {redirectAfterSearch()}
      <br></br>
      <div id='content'>
        <Navigation 
          showIssue={showIssue}
          setShowIssue={setShowIssue}
          filter={filter}
          qualifiers={qualifiers} 
          totalCount={totalCount}
          currentPage={currentPage}
          issues={issues}
          paginationLinks={paginationLinks}
          setUrl={setUrl}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default App
