import React from 'react'
import PropTypes from 'prop-types'

const IssueList = ({ issues }) => {

  /*const filteredList = issues.filter(issue => issue.title.toLowerCase()
    .includes(filter.toLowerCase()) === true) */

  console.log(issues)
  return (
    <div>{issues.map(issue => 
      (<div key={issue.id}>{issue.title} </div>))}</div>
  )

}

IssueList.propTypes = {
  issues: PropTypes.array
}

export default IssueList