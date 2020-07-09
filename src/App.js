import React, { useState, useEffect, createRef } from 'react'
import axios from 'axios'
import './App.css'
import { 
  BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navigation from './components/Navigation'
import Login from './components/Login'
import ExtendedSearch from './components/ExtendedSearch'
import '@fortawesome/fontawesome-free/css/all.css'

const App = () => {

  const [filter, setFilter]= useState('')
  const [issues, setIssues] = useState([])
  const [url, setUrl] = useState('')  
  //const [paginationLinks, setPaginationLinks] = useState('')
  const [currentPage, setCurrentPage] = useState('1')
  const [totalCount, setTotalCount] = useState('')
  const [open, setOpen] = useState(false)
  const [qualifiers, setQualifiers] = useState([])
  const [showIssue, setShowIssue] = useState(false)
  const [myIssues, setMyIssues] = useState(false)
    
  let searchInput = createRef()
  let baseUrl = 'http://localhost:3001/issues/'

  //if search term has been entered, URL is not equal to baseUrl anymore.
  //get the information from the API with response.data.items, headers.link and 
  //total_count
  useEffect(() => {
    if (url === undefined || url===baseUrl+'&page=1') {
      //do nothing
    } else {       
      axios.get(url, { withCredentials: true })
        .then(response => {
          if (myIssues) {
            setIssues(response.data)
            setShowIssue(false)
            setTotalCount(response.data.length)
            window.scrollTo(0, 0)
            console.log('my issues', response)            
          }
          else if ((filter !== '' || qualifiers.length > 0) && 
               Number(currentPage)>0 ) {
            setIssues(response.data.items)
            //setPaginationLinks(response.data.link)
            setTotalCount(response.data.total_count)
            setShowIssue(false)
            window.scrollTo(0, 0)
            console.log(response)
            //console.log('qualifiers in App',qualifiers)
            //console.log('url',url)
            //console.log('currentPage', Number(currentPage))
            console.log('----------------------------------------------------')
          }
          else {
            setTotalCount(0)
          }
        })
        .catch((error) => {   
          console.log(url) 
          console.log(error)
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
    const search = searchInput.value.replace(/ /g, '+')
    setCurrentPage('1')
    setFilter(search)
    setMyIssues(false) 
    setShowIssue(false) //not needed here because it's also in the useEffect()?
    if (qualifiers.length > 0) {
      setUrl(baseUrl+search+'+'+qualifiers.join('')+'&page=1')
    }
    else if (search !== '') {
      setUrl(baseUrl+search+'&page=1')
    }    
  }

  const showMyIssues = () => {
    //setMyIssues needed for different route in useEffect
    setMyIssues(true)
    setCurrentPage('1')
    setUrl('http://localhost:3001/my-issues/1')
  }

  ///when no search term is entered, go back to root
  const redirectAfterSearch = () => {

    if (myIssues) {
      return (
        <Router>
          <Redirect to={`/my-issues/${Number(currentPage)}`} />
        </Router>)
    }    
    else if (filter === '' && qualifiers.length === 0) {
      return (
        <Router>
          <Route exact path={'/login'} render={() => <Login />} />
          <Redirect to='/' />
        </Router>)
    }
    else {
      return (
        <Router>
          <Redirect to={`/issues/${Number(currentPage)}`} />
        </Router>)
    }
      
  }

  const extendedSearchBar = () => {
    if (!open) { 
      document.getElementById('open-extended').style.maxHeight = '2000px'
      document.getElementById('open-extended').style.transition = '0.3s'
      document.getElementById('extended-search-content').style.top = '62px'
      document.getElementById('extended-search-content')
        .style.transition = '0.3s'
      document.getElementById('open-extended-icon').style.rotate = '90deg'
      window.scrollTo(0, 0)
      setOpen(true)}
    else {
      document.getElementById('open-extended').style.maxHeight = '0'
      document.getElementById('open-extended').style.transition = '0.2s'
      document.getElementById('extended-search-content').style.top = '-450px'
      document.getElementById('extended-search-content')
        .style.transition = '0.5s'
      document.getElementById('open-extended-icon').style.rotate = '0deg'
      setOpen(false)
    }
  }

  return (
    <div className='page'>
      <div className='menu'>
        <form onSubmit={handleSubmit} className='menu-searchbar'>
          <label className='search-label'>Search: </label>
          <span>
            <input type='text' ref={(element) => searchInput = element}
              className='search-input'></input>
            <span 
              className='search-input-extended' 
              onClick={extendedSearchBar}>
              <i className="fas fa-bars" onClick={extendedSearchBar}
                id='open-extended-icon'></i>
            </span>
          </span>
        </form> 
        <div onClick={showMyIssues} id='my-issues'>My Issues</div>
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
            setMyIssues={setMyIssues}
          />
        </span>
      </div>
      {redirectAfterSearch()
      }
      <div id='content'>
        <Navigation 
          showIssue={showIssue}
          setShowIssue={setShowIssue}
          filter={filter}
          qualifiers={qualifiers} 
          totalCount={totalCount}
          currentPage={currentPage}
          issues={issues}
          url={url}
          setUrl={setUrl}
          setCurrentPage={setCurrentPage}
          myIssues={myIssues}
        />
      </div>
    </div>
  )
}

export default App
