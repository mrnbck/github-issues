import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Linked = ({ qualifiers, setQualifiers, linkedToggle, setMyIssues }) => {

  useEffect(() => {
    if (linkedToggle === false) {
      
      //remove qualifier when untoggled
      let id = 'no filter'
      let linkedRegex = /linked:([\w])+/
      let notLinkedRegex = /-linked:([\w])+/
      
      const findLinked = qualifiers.filter(value => 
        linkedRegex.exec(value))
      const findNotLinked = qualifiers.filter(value => 
        notLinkedRegex.exec(value))

      if (findLinked.length > 0) {
        QualifierChecker(findLinked, qualifiers, setQualifiers, id, setMyIssues)
      }
      if (findNotLinked.length > 0) {
        QualifierChecker(findNotLinked, qualifiers,setQualifiers,id,setMyIssues)
      }
    }
    // eslint-disable-next-line
    },[linkedToggle])
  
  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {

    const option = document.getElementById('linked').options
    const id = option[option.selectedIndex].value
    
    let linkedRegex = /linked:([\w])+/
    let notLinkedRegex = /-linked:([\w])+/

    const findEntry = qualifiers.filter(value => {
      if(linkedRegex.exec(value)) {
        return linkedRegex.exec(value)
      } 
      if(notLinkedRegex.exec(value)) {
        return notLinkedRegex.exec(value)
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
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
            onChange={selectFieldPicker}>
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