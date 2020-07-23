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
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState('')
  const [open, setOpen] = useState(false)
  const [qualifiers, setQualifiers] = useState([])
  const [showIssue, setShowIssue] = useState(false)
  const [myIssues, setMyIssues] = useState(false)
    
  let searchInput = createRef()
  let baseUrl = '/api/issues/'

  useEffect(() => {
    if (url === undefined || url===baseUrl+'&page=1') {
      //do nothing
    } else if (myIssues) {
      const checkLogin = async () => {
        const login = await axios.get('/api/user', 
          { withCredentials: true }).catch(error => error)
              
        if (login.data === false) {
          //check for 'login' in my issues to display login button
          setIssues(['login'])
          setShowIssue(false)
          //setTotalCount required to render list
          setTotalCount('1')
          window.scrollTo(0, 0)
        } else { axios.get(url, { withCredentials: true })
          .then(response => {
            setIssues(response.data)
            setShowIssue(false)
            setTotalCount(response.data.length)
            window.scrollTo(0, 0)
          })
          .catch((error) => {   
            console.log(url) 
            console.log('error: ', error)
          })
        }
      }
      checkLogin()

    } else {     
      axios.get(url, { withCredentials: true })
        .then(response => {
          if ((filter !== '' || qualifiers.length > 0) && 
               Number(currentPage)>0 ) {
            setIssues(response.data.items)
            //console.log(response.data.items)
            //setPaginationLinks(response.data.link)
            response.data.total_count === 0 || 
            response.data.total_count === undefined ? 
              setTotalCount(1) :
              setTotalCount(response.data.total_count)
            setShowIssue(false)
            window.scrollTo(0, 0)
            //console.log('qualifiers in App',qualifiers)
            //console.log('url',url)
            //console.log('currentPage', Number(currentPage))
            //console.log('---------------------------------------------------')
          }
          else {
            setTotalCount(0)
          }
        })
        .catch((error) => {   
          console.log('error: ', url) 
          console.log('error: ', error)
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
    setCurrentPage(1)
    setFilter(search)
    setMyIssues(false) 
    setShowIssue(false) 
    if (qualifiers.length > 0) 
    { setUrl(baseUrl+search+'+'+qualifiers.join('')+'&page=1')
      
    }
    else if (search !== '') {
      setUrl(baseUrl+search+'&page=1')
    }    
  }

  const showMyIssues = () => {
    //setMyIssues different function in useEffect
    setMyIssues(true)
    setShowIssue(false)
    setCurrentPage(1)
    setFilter('')
    setUrl('/api/my-issues/1')
  }

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
        .style.transition = '0.2s'
      document.getElementById('open-extended-icon').style.rotate = '90deg'
      window.scrollTo(0, 0)
      setOpen(true)}
    else {
      document.getElementById('open-extended').style.maxHeight = '0'
      document.getElementById('open-extended').style.transition = '0.2s'
      document.getElementById('extended-search-content').style.top = '-2000px'
      document.getElementById('extended-search-content')
        .style.transition = '0.5s'
      document.getElementById('open-extended-icon').style.rotate = '0deg'
      setOpen(false)
    }
  }

  const handleFilter = event => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div className='page'>
      <div className='menu'>
        <form onSubmit={handleSubmit} className='menu-searchbar'>
          <label className='search-label'>Search: </label>
          <span>
            <input type='text' ref={(element) => searchInput = element}
              value={filter}
              onChange={handleFilter}
              className='search-input'></input>
            <span 
              className='search-input-extended' 
              onClick={extendedSearchBar}>
              <i className="fas fa-bars" onClick={extendedSearchBar}
                id='open-extended-icon'></i>
            </span>
          </span>
        </form> 
        <div onClick={showMyIssues} className='my-issues'>My Issues</div>
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
