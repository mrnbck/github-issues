import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const TitleBodyComment = ({ 
  qualifiers, 
  setQualifiers, 
  titleBodyCommentToggle,
  setMyIssues }) => {

  useEffect(() => {
    if (titleBodyCommentToggle === false) {
        
      //remove qualifier when untoggled
      let id = 'no filter'
      let  regex = /in:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
      }
    }
    // eslint-disable-next-line
      },[titleBodyCommentToggle])

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const selectFieldPicker = () => {    
    
    const option = document.getElementById('titleBodyComment').options
    const id = 
      option[option.selectedIndex].value

    console.log(id)

    let  regex = /in:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))
    console.log(findEntry)

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
  }

  if (titleBodyCommentToggle === false) {
    return (<div></div>)
  } else  

    return (
      <div className="form-field">
        <label className="input-label">Title, Body or Comments</label>
        <select 
          id='titleBodyComment' 
          className="picklist" 
          defaultValue='Everywhere' 
          onChange={selectFieldPicker}>
          <option value='no filter'>Everywhere</option>
          <option value='in:title'>Title</option>
          <option value='in:body'>Body</option>
          <option value='in:comments'>Comments</option>            
        </select>
      </div>
    )
}

TitleBodyComment.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}


export default TitleBodyComment
