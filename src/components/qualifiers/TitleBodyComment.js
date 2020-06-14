import React from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'


const TitleBodyComment = ({ 
  qualifiers, 
  setQualifiers, 
  titleBodyCommentToggle }) => {

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const titleBodyComment = () => {    
    
    const titleBodyComment = document.getElementById('titleBodyComment').options
    const id = 
      titleBodyComment[titleBodyComment.selectedIndex].value

    console.log(id)

    let  regex = /\+in:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))
    console.log(findEntry)

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
  }

  if (titleBodyCommentToggle === false) {
    return (<div></div>)
  } else  

    return (
      <div className="form-field">
        <label className="input-label">Search by title, body or comments?
        </label>
        <select 
          id='titleBodyComment' 
          className="picklist" 
          defaultValue='Everywhere' 
          onChange={titleBodyComment}>
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
