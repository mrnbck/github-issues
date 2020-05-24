import React from 'react'
import IssueList from './IssueList'
import { 
  BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

const Navigation = ({ 
  filter, 
  totalCount, 
  currentPage, 
  issues, 
  paginationLinks,
  setUrl,
  setCurrentPage }) => {

  //only show pagination when there are search results, i.e. a search term 
  //has been entered
  if (filter !== '' && totalCount > 0) {
    let last = 0
    if (totalCount > 1000) {
      last = Math.floor(1000/30)+1
    } else last = Math.floor(totalCount/30)+1
    
    
    //reduce to 1 block
    // there are 4 scenarios: 
    // - if we are on the last page: dont show links for First/Previous
    // - if we are on the first page: dont show links for Next/Last
    // - if there is only 1 page, don't show links
    // - on any other page show all 5 links





    if (Number(currentPage) === last) {
      console.log('Number(currentPage) === last', totalCount)
      return (
        <div >
          <span >
            <Router >
              <Route path={'/issues/:currentPage'} 
                render={({ match }) => 
                  <IssueList 
                    issues={issues}
                    paginationLinks={paginationLinks}
                    page={match.params.currentPage}
                    setUrl={setUrl}
                    setCurrentPage={setCurrentPage}
                  />}/>
              <span>
                <Link to={`/issues/${Number(currentPage)-1}`} >
                  <span className='pagination'>Previous </span></Link>
                <Link to='/issues/1'>
                  <span className='pagination'>1 </span></Link>
                <Link to='/issues/2'>
                  <span className='pagination'>2 </span></Link>
                <span className='pagination'> ... </span>
                <Link to={`/issues/${last-4}`}>
                  <span className='pagination'>{last-4} </span></Link>
                <Link to={`/issues/${last-3}`}>
                  <span className='pagination'>{last-3} </span></Link>
                <Link to={`/issues/${last-2}`}>
                  <span className='pagination'>{last-2} </span></Link>
                <Link to={`/issues/${last-1}`}>
                  <span className='pagination'>{last-1} </span></Link>
                <Link to={`/issues/${last}`}>
                  <span className='pagination'>{last} </span></Link>
                <span className='pagination'>Next </span>              
              </span>
            </Router>
          </span>

        </div>)
    }
    
    if (Number(currentPage) >= (last-5) && Number(currentPage) < last) {

      return (
        <div >
          <span >
            <Router >
              <Route path={'/issues/:currentPage'} 
                render={({ match }) => 
                  <IssueList 
                    issues={issues}
                    paginationLinks={paginationLinks}
                    page={match.params.currentPage}
                    setUrl={setUrl}
                    setCurrentPage={setCurrentPage}
                  />}/>
              <span>
                <Link to={`/issues/${Number(currentPage)-1}`} >
                  <span className='pagination'>Previous </span></Link>
                <Link to='/issues/1'>
                  <span className='pagination'>1 </span></Link>
                <Link to='/issues/2'>
                  <span className='pagination'>2 </span></Link>
                <span className='pagination'> ... </span>
                <Link to={`/issues/${last-4}`}>
                  <span className='pagination'>{last-4} </span></Link>
                <Link to={`/issues/${last-3}`}>
                  <span className='pagination'>{last-3} </span></Link>
                <Link to={`/issues/${last-2}`}>
                  <span className='pagination'>{last-2} </span></Link>
                <Link to={`/issues/${last-1}`}>
                  <span className='pagination'>{last-1} </span></Link>
                <Link to={`/issues/${last}`}>
                  <span className='pagination'>{last} </span></Link>
                <Link to={`/issues/${Number(currentPage)+1}`}>
                  <span className='pagination'>Next </span>
                </Link>               
              </span>
            </Router>
          </span>

        </div>)
    } 
    if (Number(currentPage) > 1 && Number(currentPage) < 4) {
      return (
        <div>
          <span>
            <Router >
              <Route path={'/issues/:currentPage'}
                render={({ match }) =>                 
                  <IssueList 
                    issues={issues}
                    paginationLinks={paginationLinks}
                    page={match.params.currentPage}
                    setUrl={setUrl}
                    setCurrentPage={setCurrentPage}

                  />}/>
              <span>
                <Link to={`/issues/${Number(currentPage)-1}`}>
                  <span className='pagination'>Previous </span> </Link>
                <Link to='/issues/1'>
                  <span className='pagination'>1 </span></Link>
                <Link to='/issues/2'>
                  <span className='pagination'>2 </span></Link>
                <Link to='/issues/3'>
                  <span className='pagination'>3 </span></Link>
                <Link to='/issues/4'>
                  <span className='pagination'>4 </span></Link>
                <Link to='/issues/5'>
                  <span className='pagination'>5 </span></Link>
                <span className='pagination'> ... </span>
                <Link to={`/issues/${last-1}`}>
                  <span className='pagination'>{last-1} </span></Link>
                <Link to={`/issues/${last}`}>
                  <span className='pagination'>{last} </span></Link>
                <Link to={`/issues/${Number(currentPage)+1}`}>
                  <span className='pagination'>Next </span></Link>
              </span>
            </Router>
          </span>
        </div>
      )}
    if (Number(currentPage) >= 4 && Number(currentPage) < (last-5)) {
      return (
        <div>
          <span>
            <Router >
              
              <Route path={'/issues/:currentPage'}
                render={({ match }) =>                 
                  <IssueList 
                    issues={issues}
                    paginationLinks={paginationLinks}
                    page={match.params.currentPage}
                    setUrl={setUrl}
                    setCurrentPage={setCurrentPage}
  
                  />}/>
              <span>
                <Link to={`/issues/${Number(currentPage)-1}`}>
                  <span className='pagination'>Previous </span> </Link>
                <Link to='/issues/1'><span className='pagination'>1 </span>
                </Link>
                <Link to='/issues/2'><span className='pagination'>2 </span>
                </Link>
                <span className='pagination'> ... </span>
                <Link to={`/issues/${Number(currentPage)}`}>
                  <span className='pagination'>{Number(currentPage)} </span>
                </Link>
                <Link to={`/issues/${Number(currentPage)+1}`}>
                  <span className='pagination'>{Number(currentPage)+1} </span>
                </Link>
                <Link to={`/issues/${Number(currentPage)+2}`}>
                  <span className='pagination'>{Number(currentPage)+2} </span>
                </Link>
                <span className='pagination'> ... </span>
                <Link to={`/issues/${last-1}`}>
                  <span className='pagination'>{last-1} </span></Link>
                <Link to={`/issues/${last}`}>
                  <span className='pagination'>{last} </span></Link>
                <Link to={`/issues/${Number(currentPage)+1}`}>
                  <span className='pagination'>Next </span></Link>
              </span>
            </Router>
          </span>
        </div>
      )}  
    if (Number(currentPage) === 1) {
      console.log('(currentPage) === 1')
      return (
        <div>
          <span >
            <Router > 
              <span><Redirect to={`/issues/${Number(currentPage)}`} /></span>
              <Route path={'/issues/:currentPage'} 
                render={({ match }) =>                 
                  <IssueList 
                    issues={issues}
                    paginationLinks={paginationLinks}
                    page={match.params.currentPage}
                    setUrl={setUrl}
                    setCurrentPage={setCurrentPage}
                  />
                } />
              <span >
                <span className='pagination'>Previous </span>
                <span className='pagination'>1 </span>
                <Link to='/issues/2'>
                  <span className='pagination'>2 </span> </Link> 
                <Link to='/issues/3'>
                  <span className='pagination'>3 </span> </Link> 
                <Link to='/issues/4'>
                  <span className='pagination'>4 </span> </Link> 
                <Link to='/issues/5'><span className='pagination'>5</span> 
                </Link>
                <span className='pagination'> ... </span> 
                <Link to={`/issues/${last-1}`}>
                  <span className='pagination'>{last-1}  </span></Link>
                <Link to={`/issues/${last}`}>
                  <span className='pagination'>{last}  </span></Link>
                <Link to={`/issues/${Number(currentPage)+1}`}>
                  <span className='pagination'>Next </span></Link>
              </span>
            </Router>
          </span>
        </div>
      )}

    if (Number(currentPage) === 1 && last === 1) {
      console.log('Number(currentPage) === 1 && last === 1')
      return (
        <div>
          <span className='pagination'>Previous </span>
          <span className='pagination'>1 </span>
          <span className='pagination'>2 </span> 
          <span className='pagination'>3 </span>
          <span className='pagination'>4 </span>
          <span className='pagination'>5 </span>
          <span className='pagination'>{last} </span> 
          <span className='pagination'>Next </span>           
        </div>
      )}
  } 
  
  else return (
    <div> </div>
  )
}

export default Navigation