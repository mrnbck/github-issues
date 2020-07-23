import React, { useState } from 'react'
import IssueList from './IssueList'
import OpenIssue from './OpenIssue'
import MyIssues from './MyIssues'
import { 
  BrowserRouter as Router, Route } from 'react-router-dom'
import PaginationMobile from './PaginationMobile'
import PaginationDesktop from './PaginationDesktop'

const Navigation = ({ 
  filter, 
  totalCount, 
  currentPage, 
  issues, 
  setUrl,
  url,
  setCurrentPage,
  qualifiers,
  showIssue,
  setShowIssue,
  myIssues }) => {

  const [issue, setIssue] = useState({})
    
  if ((filter !== '' || qualifiers !== '') && totalCount > 0) {
    let last = 0
    if (totalCount > 1000) {
      last = Math.floor(1000/30)+1
    } else 
    if (totalCount % 30 === 0) {
      last = totalCount / 30
    } else
      last = Math.floor(totalCount/30)+1

    return (
      <div>
        <span>
          <Router>
            <Route exact path={'/my-issues/:currentPage'} 
              render={({ match }) => 
                <MyIssues 
                  setShowIssue={setShowIssue}
                  issues={issues}
                  setIssue={setIssue}
                  page={Number(match.params.currentPage)}
                  url={url}
                  setUrl={setUrl}
                  currentPage={currentPage}
                />}
            />
            <Route exact path={'/issues/id/:id'}
              render={() => 
                <OpenIssue 
                  showIssue={showIssue}
                  setShowIssue={setShowIssue}
                  issue={issue}
                  setIssue={setIssue} 
                  currentPage={currentPage} 
                  myIssues={myIssues}  
                />}
            />
            <Route exact path={'/issues/:currentPage'} 
              render={({ match }) => 
                <IssueList 
                  showIssue={showIssue}
                  setShowIssue={setShowIssue}
                  issues={issues}
                  page={Number(match.params.currentPage)}
                  url={url}
                  setUrl={setUrl}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  issue={issue}
                  setIssue={setIssue}
                />}
            />
            {//hide pagination and issuelist while an issue is open
              showIssue ? '' : (
              // pagination on mobile
                window.innerWidth <= 600 ?
                  <PaginationMobile 
                    currentPage={currentPage} 
                    last={last} 
                    setCurrentPage={setCurrentPage}
                  /> :
                                            
                  <PaginationDesktop 
                    currentPage={currentPage} 
                    last={last} 
                    setCurrentPage={setCurrentPage}
                  />
              )
            }
          </Router>
        </span>
      </div>)}
        
  else return (
    <div></div>
  )
}


export default Navigation