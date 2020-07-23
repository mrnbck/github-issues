import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import ShowIssues from './ShowIssues'


const IssueList = ({ 
  page, currentPage, url,
  setUrl, issues, setIssue, 
  setShowIssue }) => {

  //obsolete after I changed the pagination to show more pages
  //than just the rel's
  //----------------------------------------------------------
  //const linkRegex = /<([^>]+)/g    
  //const linkArray = []
  //let temp = 0
  
  //if (paginationLinks !== '') {
  //  while ((temp = linkRegex.exec(paginationLinks)) !== null) {
  //    linkArray.push(temp[1])
  //  }
  //}

  //get pagination links and remove the last digit
  //let link = 0
  //let digits = 0

  //currentPage > 10 ? digits = 2 : digits = 1
  //if (linkArray.length > 0) {
  //  link = linkArray[0].slice(0,linkArray[0].length-digits)}
  
  const regex = /.+[^\d]/ /*get everything except the number at the end*/

  const link = url.match(regex)[0]
  
  useEffect(() => {
    //console.log('link', paginationLinks)
    if (link.length > 0 && Number(page)>0) {
      //console.log('url in issueList', url)
      //console.log('link+page', link+page)
      setUrl(link+currentPage) //changed from 'page'
      //console.log('page', page, 'in issueList')
      //setCurrentPage(page)
      //console.log('----------------------------------------------------')
    }    
    // eslint-disable-next-line
  },[currentPage])
  
  if (issues === undefined) {
    return (
      <div className='no-results'>No results matched your search.</div>
    )
  }

  return (
    <div><ShowIssues 
      setIssue = {setIssue}
      setShowIssue = {setShowIssue}
      issues = {issues}
    /></div>
  )
}  

  
IssueList.propTypes = {
  issues: PropTypes.array,
  setUrl: PropTypes.func,
  url:PropTypes.string,
  paginationLinks: PropTypes.string,
  page: PropTypes.number,
  currentPage: PropTypes.number,
  showIssue:PropTypes.bool,
  setShowIssue:PropTypes.func,
  issue:PropTypes.object,
  setIssue:PropTypes.func
}

export default IssueList