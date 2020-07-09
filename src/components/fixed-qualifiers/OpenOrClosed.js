import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const OpenOrClosed = ({ qualifiers, setQualifiers, openOrClosedToggle }) => {

  useEffect(() => {
    if (openOrClosedToggle === false) {
      
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /state:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id)
      }
    }
    // eslint-disable-next-line
    },[openOrClosedToggle])
  
  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('openOrClosed').options
    const id = option[option.selectedIndex].value
    
    let regex = /state:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
  }

  if (openOrClosedToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Open or Closed State</label>
        <span >
          <select id='openOrClosed' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>Both</option>
            <option value='state:open'>Open</option>
            <option value='state:closed'>Closed</option>
          </select>
        </span>
      </div>
    )

}

OpenOrClosed.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}



export default OpenOrClosed