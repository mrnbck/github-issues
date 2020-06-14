import React from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const PublicOrPrivate = ({ 
  qualifiers, 
  setQualifiers, 
  publicOrPrivateToggle }) => {

  const publicOrPrivate = () => {

    const publicOrPrivate = document.getElementById('publicOrPrivate').options
    const id = publicOrPrivate[publicOrPrivate.selectedIndex].value
    
    let regex = /\+is:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
  }

  if (publicOrPrivateToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Public Or Private?</label>
        <span >
          <select id='publicOrPrivate' className="picklist" defaultValue='Both' 
            onChange={publicOrPrivate}>
            <option value='no filter'>Both</option>
            <option value='is:public'>Public</option>
            <option value='is:private'>Private</option>
          </select>
        </span>
      </div>
    )

}

PublicOrPrivate.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func

}

export default PublicOrPrivate