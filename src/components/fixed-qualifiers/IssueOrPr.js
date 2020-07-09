import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const IssueOrPr = ({ qualifiers, setQualifiers, issueOrPrToggle }) => {

  useEffect(() => {
    if (issueOrPrToggle === false) {
    
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /type:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id)
      }
    }
    // eslint-disable-next-line
  },[issueOrPrToggle])

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const issueOrPr = document.getElementById('issueOrPr').options
    const id = issueOrPr[issueOrPr.selectedIndex].value
    
    let regex = /type:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))
    
    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
  }

  if (issueOrPrToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Issues or Pull Requests</label>
        <span >
          <select id='issueOrPr' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>Both</option>
            <option value='type:issue'>Issues</option>
            <option value='type:pr'>Pull Requests</option>
          </select>
        </span>
      </div>
    )

}

IssueOrPr.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}

export default IssueOrPr