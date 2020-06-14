import React from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Linked = ({ qualifiers, setQualifiers, linkedToggle }) => {

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const optionPicker = () => {

    const option = document.getElementById('linked').options
    const id = option[option.selectedIndex].value
    
    let linkedRegex = /\+linked:([\w])+/
    let notLinkedRegex = /\+-linked:([\w])+/

    const findEntry = qualifiers.filter(value => {
      if(linkedRegex.exec(value)) {
        return linkedRegex.exec(value)
      } 
      if(notLinkedRegex.exec(value)) {
        return notLinkedRegex.exec(value)
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
  }

  if (linkedToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Linked Issues and Pull Requests</label>
        <span >
          <select id='linked' className="picklist" defaultValue='Both' 
            onChange={optionPicker}>
            <option value='no filter'>All</option>
            <option value='linked:issue'>Linked Issues</option>
            <option value='linked:pr'>Linked Pull Requests</option>
            <option value='-linked:issue'>Unlinked Issues</option>
            <option value='-linked:pr'>Unlinked Pull Requests</option>
          </select>
        </span>
      </div>
    )

}

Linked.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}

export default Linked