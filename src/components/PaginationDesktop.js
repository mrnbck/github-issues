import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const PaginationDesktop = ({ setCurrentPage, currentPage, last }) => {
  
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
        {//on the first page 'previous' is not a link
          Number(currentPage) === 1 ? 
            <span className='previous-next' > Previous</span> : 
            <span className='previous-next' id='first'
              onClick={() => setCurrentPage(Number(currentPage)-1)}>
                Previous
            </span>
        }
        {// '1' is always a link
          <span className={active(1)} onClick={() => setCurrentPage(1)}>1
          </span>
        }
        {// '2' is only a link when last > 1
          last >= 2 ?
            <span 
              className={active(2)} 
              onClick={() => setCurrentPage(2)}>2
            </span> :
            <span> </span>

        }
        {// '3' is only visible when currentPage <= 5
          last >= 3 && (Number(currentPage < 5) || 
          Number(currentPage) >= last -1 || last <= 5) ?  
            <span className={active(3)} onClick={() => setCurrentPage(3)}>3
            </span> :
            <span></span>
        }
        {// show ... if currentPage > 5
          Number(currentPage) >= 5 && 
          Number(currentPage) < (last-1) ?
            <span className='pagination'>...</span> :
            <span></span>
        }
        {// ' 4 is only visible when currentPage <= 5
          last >= 4 && (Number(currentPage) < 5 || 
          Number(currentPage) >= last -1 || last < 5) ?
            <span className={active(4)} onClick={() => setCurrentPage(4)}>4
            </span> :
            <span></span>
        }
        {// '5' is only visible when currentPage <= 5
          last >= 5 && (Number(currentPage) < 5 || 
          Number(currentPage) >= last -1) ?
            <span className={active(5)} onClick={() => setCurrentPage(5)}>5
            </span> :
            <span></span>
        }
        {//if currentPage is bigger than 5, show previous 2 pages
          Number(currentPage) >= 5 && Number(currentPage) < (last-2) ?
            <span 
              className='pagination' 
              onClick={() => setCurrentPage(Number(currentPage)-2)}>
              {Number(currentPage)-2} 
            </span> :
            <span></span>
        }
        {//if currentPage is bigger than 5, show previous 2 pages
          Number(currentPage) >= 5 && Number(currentPage) < (last-2) ?
            <span 
              className='pagination' 
              onClick={() => setCurrentPage(Number(currentPage)-1)}>
              {Number(currentPage)-1} 
            </span> :
            <span></span>
        }
        {//if currentPage is bigger than 5, show the next 3 pages
          Number(currentPage) >= 5 && 
Number(currentPage) < (last-1) ?
            <Link 
              className={active(Number(currentPage))} 
              to={`/issues/${Number(currentPage)}`}
              onClick={() => setCurrentPage(Number(currentPage))}>
              <span>
                {Number(currentPage)} 
              </span>
            </Link> :
            <span></span>
        }
        {//if currentPage is bigger than 5, show the next 2 pages
          Number(currentPage) >= 5 && Number(currentPage) < (last-2) ?
            <span 
              className='pagination'               
              onClick={() => setCurrentPage(Number(currentPage)+1)}>
              {Number(currentPage)+1} 
            </span> :
            <span></span>
        }
        {//if currentPage is bigger than 5, show the next page
          Number(currentPage) >= 5 && Number(currentPage) < (last-2) ?
            <span 
              className='pagination'
              onClick={() => setCurrentPage(Number(currentPage)+2)}>
              {Number(currentPage)+2} 
            </span> :
            <span></span>
        }
        { last > 6 && Number(currentPage) !== (last-2) ?
          <span className='pagination'>...</span> :
          <span></span>
        }
        {//only show the second to last page if more than 5 pgs
          last > 6 && Number(currentPage) !== (last-3)?
            <span 
              className={active(last-1)} 
              onClick={() => setCurrentPage(last-1)}
            >{last-1}
            </span>   :
            <span></span>
        }
        {//only show the last page  if there are more than 5 pages
          last > 5 ?
            <span 
              className={active(last)} 
              onClick={() => setCurrentPage(last)}>{last}
            </span> :
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



PaginationDesktop.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  last: PropTypes.number
}

export default PaginationDesktop