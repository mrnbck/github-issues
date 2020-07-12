import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Metadata = ({ 
  qualifiers, setQualifiers, 
  metadataToggle, setMyIssues }) => {

  useEffect(() => {
    if (metadataToggle === false) {
      
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /no:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
      }
    }
    // eslint-disable-next-line
    },[metadataToggle])
  
  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('metadata').options
    const id = option[option.selectedIndex].value
    
    let regex = /no:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
  }

  if (metadataToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Missing Metadata</label>
        <span >
          <select id='metadata' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='no:label'>No Labels</option>
            <option value='no:milestone'>No Milestones</option>
            <option value='no:assignee'>No Assignees</option>
            <option value='no:project'>No Projects</option>
          </select>
        </span>
      </div>
    )

}

Metadata.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}

export default Metadata