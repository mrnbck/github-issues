import React from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Draft = ({ qualifiers, setQualifiers, mergeToggle }) => {

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const draft = () => {

    const option = document.getElementById('merged').options
    const id = option[option.selectedIndex].value
    
    let merged = /is:merged/
    let unmerged = /is:unmerged/

    const findEntry = qualifiers.filter(value => {
      if (merged.exec(value)) {
        return (merged.exec(value))
      }
      if (unmerged.exec(value)) {
        return (unmerged.exec(value))
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
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
            onChange={draft}>
            <option value='no filter'>All</option>
            <option value='is:merged'>Merged</option>
            <option value='is:unmerged'>Unmerged</option>
          </select>
        </span>
      </div>
    )

}

Draft.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}

export default Draft