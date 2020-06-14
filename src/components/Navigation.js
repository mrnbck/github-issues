import React from 'react'
import IssueList from './IssueList'
import { 
  BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Navigation = ({ 
  filter, 
  totalCount, 
  currentPage, 
  issues, 
  paginationLinks,
  setUrl,
  setCurrentPage,
  qualifiers }) => {

  //only show pagination when there are search results, i.e. a search term 
  //has been entered
  if ((filter !== '' || qualifiers !== '') && totalCount > 0) {
    //console.log('totalCount',totalCount)
    let last = 0
    if (totalCount > 1000) {
      last = Math.floor(1000/30)+1
    } else 
    if (totalCount % 30 === 0) {
      last = totalCount / 30
    } else
      last = Math.floor(totalCount/30)+1

    const active = (id) => {
      if (Number(currentPage) === id) {
        return ('pagination active')
      }
      else return ('pagination')
      
    }
    
    //console.log(totalCount)
    
    return (
      <div>
        <span>
          <Router>
            <Route path={'/issues/:currentPage'} 
              render={({ match }) => 
                <IssueList 
                  issues={issues}
                  paginationLinks={paginationLinks}
                  page={match.params.currentPage}
                  setUrl={setUrl}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />}
            />
            {// pagination in mobile
              window.innerWidth <= 600 ?
                (//on the first page 'previous' is not a link
                
                  <span className='pagination-links'>
                    {console.log(window.innerWidth)}
                    {//on the first page 'previous' is not a link
                      Number(currentPage) === 1 ? 
                        <span className='previous-next' > Previous</span> : 
                        <Link className='previous-next' id='first'
                          to={`/issues/${Number(currentPage)-1}`} >
                          <span >Previous</span></Link>
                    }
                    {// '1' is always a link
                      <Link to='/issues/1'>
                        <span className={active(1)}>1</span></Link>
                    }
                    {// show ... if currentPage > 1
                      Number(currentPage) >= 2 && Number(currentPage) < (last) ?
                        <span className='pagination'>...</span> :
                        <span></span>
                    }
                    {//if currentPage is bigger than 1, show the current page
                      Number(currentPage) >= 2 && Number(currentPage) < (last) ?
                        <Link className={active(Number(currentPage))} 
                          to={`/issues/${Number(currentPage)}`}>
                          <span>{Number(currentPage)} 
                          </span></Link> :
                        <span></span>
                    }
                    { last > 2 && Number(currentPage) !== (last-1) ?
                      <span className='pagination'>...</span> :
                      <span></span>
                    }
                    {//only show the last page  if there are more than 5 pages
                      last > 2 ?
                        <Link className={active(last)} to={`/issues/${last}`}>
                          <span >{last}</span></Link> :
                        <span></span>
                    }
                    {//if we are not on the last page, 'Next' is a link
                      Number(currentPage) !== last ?
                        <Link className='previous-next' 
                          to={`/issues/${Number(currentPage)+1}`}>
                          <span >Next </span></Link> :
                        <span className='previous-next'>Next </span>
                    }
                  </span>
                        
                )
                //pagination on screens wider than 600px
                : 

                (
            
                  <span className='pagination-links'>
              
                    {//on the first page 'previous' is not a link
                      Number(currentPage) === 1 ? 
                        <span className='previous-next' > Previous</span> : 
                        <Link className='previous-next' id='first'
                          to={`/issues/${Number(currentPage)-1}`} >
                          <span >Previous</span></Link>
                    }
                    {// '1' is always a link
                      <Link to='/issues/1'>
                        <span className={active(1)}>1</span></Link>
                    }
                    {// '2' is only a link when last > 1
                      last >= 2 ?
                        <Link className={active(2)}to='/issues/2'>
                          <span>2</span></Link> :
                        <span> </span>
                  
                    }
                    {// '3' is only visible when currentPage <= 5
                      last >= 3 && (Number(currentPage < 5) || 
                Number(currentPage) >= last -1 || last <= 5) ?  
                        <Link className={active(3)} to='/issues/3'>
                          <span>3</span></Link> :
                        <span></span>
                    }
                    {// show ... if currentPage > 5
                      Number(currentPage) >= 5 && Number(currentPage) < (last-1) ?
                        <span className='pagination'>...</span> :
                        <span></span>
                    }
                    {// ' 4 is only visible when currentPage <= 5
                      last >= 4 && (Number(currentPage) < 5 || 
                Number(currentPage) >= last -1 || last < 5) ?
                        <Link className={active(4)} to='/issues/4'>
                          <span >4</span></Link> :
                        <span></span>
                    }
                    {// '5' is only visible when currentPage <= 5
                      last >= 5 && (Number(currentPage) < 5 || 
                Number(currentPage) >= last -1) ?
                        <Link className={active(5)} to='/issues/5'>
                          <span >5</span></Link> :
                        <span></span>
                    }
                    {//if currentPage is bigger than 5, show the previous 2 pages
                      Number(currentPage) >= 5 && Number(currentPage) < (last-2) ?
                        <Link className='pagination' 
                          to={`/issues/${Number(currentPage)-2}`}>
                          <span >{Number(currentPage)-2} 
                          </span></Link> :
                        <span></span>
                    }
                    {//if currentPage is bigger than 5, show the previous 2 pages
                      Number(currentPage) >= 5 && Number(currentPage) < (last-2) ?
                        <Link className='pagination' 
                          to={`/issues/${Number(currentPage)-1}`}>
                          <span >{Number(currentPage)-1} 
                          </span></Link> :
                        <span></span>
                    }
                    {//if currentPage is bigger than 5, show the next 3 pages
                      Number(currentPage) >= 5 && Number(currentPage) < (last-1) ?
                        <Link className={active(Number(currentPage))} 
                          to={`/issues/${Number(currentPage)}`}>
                          <span>{Number(currentPage)} 
                          </span></Link> :
                        <span></span>
                    }
                    {//if currentPage is bigger than 5, show the next 2 pages
                      Number(currentPage) >= 5 && Number(currentPage) < (last-2) ?
                        <Link className='pagination' 
                          to={`/issues/${Number(currentPage)+1}`}>
                          <span >{Number(currentPage)+1} 
                          </span></Link> :
                        <span></span>
                    }
                    {//if currentPage is bigger than 5, show the next page
                      Number(currentPage) >= 5 && Number(currentPage) < (last-2) ?
                        <Link className='pagination' 
                          to={`/issues/${Number(currentPage)+2}`}>
                          <span >{Number(currentPage)+2} 
                          </span></Link> :
                        <span></span>
                    }
                    { last > 6 && Number(currentPage) !== (last-2) ?
                      <span className='pagination'>...</span> :
                      <span></span>
                    }
                    {//only show the second to last page if there are more than 5 pgs
                      last > 6 && Number(currentPage) !== (last-3)?
                        <Link className={active(last-1)} to={`/issues/${last-1}`}>
                          <span >{last-1}</span></Link> :
                        <span></span>
                    }
                    {//only show the last page  if there are more than 5 pages
                      last > 5 ?
                        <Link className={active(last)} to={`/issues/${last}`}>
                          <span >{last}</span></Link> :
                        <span></span>
                    }
                    {//if we are not on the last page, 'Next' is a link
                      Number(currentPage) !== last ?
                        <Link className='previous-next' 
                          to={`/issues/${Number(currentPage)+1}`}>
                          <span >Next </span></Link> :
                        <span className='previous-next'>Next </span>
                    }
                  </span> ) }
          </Router>
        </span>
      </div>)} 
        
  else return (
    <div></div>
  )
}


export default Navigation