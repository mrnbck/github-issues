import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const PublicOrPrivate = ({ 
  qualifiers, 
  setQualifiers, 
  publicOrPrivateToggle }) => {

  useEffect(() => {
    if (publicOrPrivateToggle === false) {
        
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /\+is:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id)
      }
    }
    // eslint-disable-next-line
      },[publicOrPrivateToggle])
    
  const selectFieldPicker = () => {

    const option = document.getElementById('publicOrPrivate').options
    const id = option[option.selectedIndex].value
    
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
        <label className="input-label">Public Or Private</label>
        <span >
          <select id='publicOrPrivate' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
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