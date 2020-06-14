import React from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const OpenOrClosed = ({ qualifiers, setQualifiers, openOrClosedToggle }) => {

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const openOrClosed = () => {

    const openOrClosed = document.getElementById('openOrClosed').options
    const id = openOrClosed[openOrClosed.selectedIndex].value
    
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
        <label className="input-label">Open or Closed State?</label>
        <span >
          <select id='openOrClosed' className="picklist" defaultValue='Both' 
            onChange={openOrClosed}>
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