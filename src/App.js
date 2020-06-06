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
  const [peak, setPeak] = useState(false)
  const [qualifiers, setQualifiers] = useState([])
    
  let searchInput = createRef()
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
            //console.log('--------------------------------------------------')
            //console.log('App useEffect()')
            setIssues(response.data.items)
            setPaginationLinks(response.headers.link)
            setTotalCount(response.data.total_count)

            window.scrollTo(0, 0)
            console.log(response.data)
            console.log('qualifiers in App',qualifiers)
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
    if (qualifiers.length > 0) {
      setUrl(baseUrl+searchInput.value+qualifiers.join('')+'&page=1')
    }
    else setUrl(baseUrl+searchInput.value+'&page=1')
    //console.log(baseUrl+input.value+'&page=1')
    setFilter(searchInput.value)
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
        <span>
          <Redirect to={`/issues/${Number(currentPage)}`} /></span>
      </Router>)
      
  }

  const extendedSearchBar = () => {
    if (!open) { 
      document.getElementById('open-extended').style.height = '450px'
      document.getElementById('open-extended').style.transition = '0.5s'
      document.getElementById('extended-search-content').style.top = '42px'
      document.getElementById('open-extended-icon').style.rotate = '90deg'
      document.getElementById('main').style.marginTop = '510px'
      document.getElementById('main').style.transition = '0.5s'
      setOpen(true)}
    else {
      document.getElementById('open-extended').style.height = '0px'
      document.getElementById('open-extended').style.transition = '0.5s'
      document.getElementById('extended-search-content').style.top = '-450px'
      document.getElementById('open-extended-icon').style.rotate = '0deg'
      document.getElementById('main').style.marginTop = '0px'
      document.getElementById('main').style.transition = '0.5s'
      setOpen(false)
    }
  }

  const peakExtendedSearchBar = () => {

    if (!peak && !open) {
      document.getElementById('open-extended').style.height = '56px'
      document.getElementById('open-extended').style.transition = '0.1s' 
      document.getElementById('open-extended-icon').style.transition = '0.3s'
      document.getElementById('open-extended-icon').style.scale = '1.3'     
      setPeak(true)
    } 
    if (peak && !open) {
      document.getElementById('open-extended').style.height = '0px'
      document.getElementById('open-extended').style.transition = '0.1s'
      document.getElementById('open-extended-icon').style.transition = '0.3s'
      document.getElementById('open-extended-icon').style.scale = '1.0'
      setPeak(false)
    }
    if (peak && open) {
      document.getElementById('open-extended-icon').style.transition = '0.3s'
      document.getElementById('open-extended-icon').style.scale = '1.0'
    }
  }

  return (
    <div className='page'>

      <div className='menu'>
        <form onSubmit={handleSubmit} >
          <label>Search: </label>
          <input type='text' ref={(element) => searchInput = element}
            className='search-input'
          ></input>
          <i className="fas fa-bars" onClick={extendedSearchBar}
            id='open-extended-icon' onMouseEnter={peakExtendedSearchBar}
            onMouseLeave={peakExtendedSearchBar}></i>
        </form> 
        <span id='repositories'>Repositories</span>
        <span>Users</span>
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
          />
        </span>
      </div>
      <span></span>
      {redirectAfterSearch()}
      <br></br>
      <div id='main'>
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
    </div>
  )
}

export default App
