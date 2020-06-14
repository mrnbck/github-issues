import React from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Locked = ({ qualifiers, setQualifiers, lockedToggle }) => {

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('locked').options
    const id = option[option.selectedIndex].value
    
    let merged = /is:locked/
    let unmerged = /is:unlocked/

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

  if (lockedToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Locked/Unlocked</label>
        <span >
          <select id='locked' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='is:locked'>Locked</option>
            <option value='is:unlocked'>Unlocked</option>
          </select>
        </span>
      </div>
    )

}

Locked.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}

export default Locked