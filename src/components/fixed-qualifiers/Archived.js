import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Archived = ({ 
  qualifiers, setQualifiers, 
  archiveToggle, setMyIssues 
}) => {

  useEffect(() => {
    if (archiveToggle === false) {
      
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /archived:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id)
      }
    }
    // eslint-disable-next-line
  },[archiveToggle])

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('archived').options
    const id = option[option.selectedIndex].value
    
    let regex = /archived:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
  }

  if (archiveToggle === false) {
    
    return (
      <div></div>)
  }  else 
    return (
      <div className="form-field">   
        <label className="input-label">Archived Repositories</label>
        <span >
          <select id='archived' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='archived:true'>Archived</option>
            <option value='archived:false'>Not Archived</option>
          </select>
        </span>
      </div>
    )
}

Archived.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
  setMyIssues:PropTypes.func,
  archiveToggle:PropTypes.bool
}

export default Archived