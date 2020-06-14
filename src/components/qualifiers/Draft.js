import React from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Draft = ({ qualifiers, setQualifiers, draftToggle }) => {

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('draft').options
    const id = option[option.selectedIndex].value
    
    let regex = /\+draft:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
  }

  if (draftToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Draft Pull Requests</label>
        <span >
          <select id='draft' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='draft:true'>Draft Pull Requests</option>
            <option value='draft:false'>Draft, Ready for Review</option>
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