import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../../helpers/QualifierChecker'

const CommitStatus = ({ 
  qualifiers, setQualifiers, 
  commitStatusToggle, setMyIssues }) => {

  useEffect(() => {
    if (commitStatusToggle === false) {
      
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /status:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
      }
    }
    // eslint-disable-next-line
    },[commitStatusToggle])
  
  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('commitStatus').options
    const id = option[option.selectedIndex].value
    
    let regex = /status:([\w])+/
    
    const findEntry = qualifiers.filter(value => {
      if(regex.exec(value)) {
        return regex.exec(value)
      } 
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
  }

  if (commitStatusToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Commit Status</label>
        <span >
          <select id='commitStatus' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='status:pending'>Pending</option>
            <option value='status:success'>Success</option>
            <option value='status:failure'>Failure</option>
          </select>
        </span>
      </div>
    )

}

CommitStatus.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}

export default CommitStatus