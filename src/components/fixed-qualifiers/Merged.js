import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Merged = ({ qualifiers, setQualifiers, mergeToggle, setMyIssues }) => {

  useEffect(() => {
    if (mergeToggle === false) {
      //remove qualifier when untoggled
      let id = 'no filter'
      let mergedRegex = /is:merged/
      let unmergedRegex = /is:unmerged/
        
      const findMerged = qualifiers.filter(value => mergedRegex.exec(value))
      const findUnmerged = qualifiers.filter(value => unmergedRegex.exec(value))
      if (findMerged.length > 0) {
        QualifierChecker(findMerged, qualifiers, setQualifiers, id, setMyIssues)
      } 
      if (findUnmerged.length > 0) {
        QualifierChecker(findUnmerged, qualifiers, setQualifiers,id,setMyIssues)
      }
    }
    // eslint-disable-next-line
      },[mergeToggle]) 
  
  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('merged').options
    const id = option[option.selectedIndex].value
    
    let mergedRegex = /is:merged/
    let unmergedRegex = /is:unmerged/

    const findEntry = qualifiers.filter(value => {
      if (mergedRegex.exec(value)) {
        return (mergedRegex.exec(value))
      }
      if (unmergedRegex.exec(value)) {
        return (unmergedRegex.exec(value))
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
  }

  if (mergeToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Merged/Unmerged</label>
        <span >
          <select id='merged' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='is:merged'>Merged</option>
            <option value='is:unmerged'>Unmerged</option>
          </select>
        </span>
      </div>
    )

}

Merged.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}

export default Merged