import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'


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

  const history = useHistory()

  const openIssue = (issue) => {
    //useState to make the issue available to move it to the next component
    setIssue(issue)
    setShowIssue(true)
    history.push(`id/${issue.id}`)
  }

  return (
    <div className='issue-list'>
      <h3>Issues</h3>      
      <div>{issues.map(issue => 
        (<div 
          key={issue.id} 
          className='issue-list-item' 
          onClick={() => openIssue(issue) }>
          {issue.title}
        </div>))}
      </div>
    </div>
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