import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'

const PaginationMobile = ({ setCurrentPage, currentPage, last }) => {
  
  const active = (id) => {
    //console.log('current', Number(currentPage), 'id', id)
    if (Number(currentPage) === id) {
      return ('pagination active')
    }
    else return ('pagination')      
  }

  return (
    <Router>
      <span className='pagination-links'>
        {console.log(window.innerWidth)}
        {//on the first page 'previous' is not a link
          Number(currentPage) === 1 ? 
            <span className='previous-next' > Previous</span> : 
            <span 
              className='previous-next' 
              id='first' 
              onClick={() => setCurrentPage(Number(currentPage)-1)}>
                Previous
            </span>
        }
        {// '1' is always a link
          <span className={active(1)} onClick={() => setCurrentPage(1)} >1
          </span>

        }
        {// show ... if currentPage > 1
          Number(currentPage) >= 2 && Number(currentPage) < (last) ?
            <span className='pagination'>...</span> :
            <span></span>
        }
        {//if currentPage is bigger than 1, show the current page
          Number(currentPage) >= 2 && Number(currentPage) < (last) ?
            <span className={active(Number(currentPage))} 
              onClick={() => setCurrentPage(Number(currentPage))}>
              {Number(currentPage)}
            </span> :
            <span></span>
        }
        { last > 2 && Number(currentPage) !== (last-1) ?
          <span className='pagination'>...</span> :
          <span></span>
        }
        {//only show the last page  if there are more than 5 pages
          last > 2 ?
            <span 
              className={active(last)} 
              onClick={() => setCurrentPage(last)}>{last}</span> :
            <span></span>
        }
        {//if we are not on the last page, 'Next' is a link
          Number(currentPage) !== last ?
            <span 
              className='previous-next' 
              onClick={() => setCurrentPage(Number(currentPage)+1)}>Next 
            </span> :
            <span className='previous-next'>Next </span>
        }
      </span>
    </Router>
  )
}

PaginationMobile.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  last: PropTypes.number
}

export default PaginationMobile