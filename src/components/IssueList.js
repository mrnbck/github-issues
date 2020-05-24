import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const IssueList = ({ 
  page, currentPage, paginationLinks, 
  setUrl, setCurrentPage, issues }) => {
  
  const linkRegex = /<([^>]+)/g    ///<([^\d]+)/g
  const linkArray = []
  let temp = 0
  
  if (paginationLinks !== '') {
    while ((temp = linkRegex.exec(paginationLinks)) !== null) {
      linkArray.push(temp[1])
    }
  }

  //get pagination links and remove the last digit
  let digits = 0
  let link = ''

  currentPage > 10 ? digits = 2 : digits = 1
  if (linkArray.length > 0) {
    link = linkArray[0].slice(0,linkArray[0].length-digits)}

  console.log('linkArray in IssueList',linkArray)
  //console.log(linkRegex.exec(paginationLinks))
 
  
  useEffect(() => {
    console.log('----------------------------------------------------')
    console.log('IssueList useEffect')
    if (link.length > 0) {
      console.log('link+page', link+page)
      setUrl(link+page)
      setCurrentPage(page)
      console.log('----------------------------------------------------')
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
  page: PropTypes.string,
  currentPage: PropTypes.string
}

export default IssueList