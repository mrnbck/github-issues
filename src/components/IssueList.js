import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const IssueList = ({ 
  page, paginationLinks, setUrl, setCurrentPage, issues,  }) => {
  
  //console.log('paginationLinks', paginationLinks)
    
  const linkRegex = /<([^\d]+)/g    ///<([^\d]+)/g
  const linkArray = []
  let temp = 0
  
  if (paginationLinks !== '') {
    while ((temp = linkRegex.exec(paginationLinks)) !== null) {
      linkArray.push(temp[1])
    }
  }

  //get the last page and remove the last 2 digits (since max number
  //is 34 page with 30 entries per page
  //change later and base it on items per page instead of hardcode)
  const link = linkArray[1].slice(0,linkArray[1].length-2)

  //console.log(link)
  //console.log(linkRegex.exec(paginationLinks))
 
  
  useEffect(() => {
    console.log('IssueList useEffect')
    if (link.length > 0) {
      setUrl(linkArray[0]+page)
      setCurrentPage(page)
      console.log('page',page)
    }    
    //console.log('newUrl', linkArray[0]+page)
    // eslint-disable-next-line
  },[page])

 
    
  return (
    <div className='issue-list'>
      <h3>Issues</h3>
      
      <div>{issues.map(issue => 
        (<div key={issue.id} className='issue-list-item'>
          {issue.title} </div>))}</div>
    </div>
  )
  
}
  
IssueList.propTypes = {
  issues: PropTypes.array,
  setCurrentPage: PropTypes.func,
  setUrl: PropTypes.func,
  paginationLinks: PropTypes.string,
  page: PropTypes.string
}

export default IssueList