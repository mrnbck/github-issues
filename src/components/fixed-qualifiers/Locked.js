import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../../helpers/QualifierChecker'

const Locked = ({ qualifiers, setQualifiers, lockedToggle, setMyIssues }) => {

  useEffect(() => {
    if (lockedToggle === false) {
      
      //remove qualifier when untoggled
      let id = 'no filter'
      let lockedRegex = /is:locked/
      let unlockedRegex = /is:unlocked/
      
      const findLocked = qualifiers.filter(value => 
        lockedRegex.exec(value))
      const findUnlocked = qualifiers.filter(value => 
        unlockedRegex.exec(value))

      if (findLocked.length > 0) {
        QualifierChecker(findLocked, qualifiers, setQualifiers, id, setMyIssues)
      }
      if (findUnlocked.length > 0) {
        QualifierChecker(findUnlocked, qualifiers, setQualifiers,id,setMyIssues)
      }
    }
    // eslint-disable-next-line
    },[lockedToggle])
  
  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('locked').options
    const id = option[option.selectedIndex].value
    
    let lockedRegex = /is:locked/
    let unlockedRegex = /is:unlocked/

    const findEntry = qualifiers.filter(value => {
      if (lockedRegex.exec(value)) {
        return (lockedRegex.exec(value))
      }
      if (unlockedRegex.exec(value)) {
        return (unlockedRegex.exec(value))
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
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