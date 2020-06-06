import React from 'react'
import PropTypes from 'prop-types'

const TitleBodyComment = ({ qualifiers, setQualifiers }) => {

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
    const helper = findEntry[0]
    let newQualifiers = []
    console.log('qualifiers',qualifiers)
    console.log('helper', helper)      
    if (helper) {
      console.log('qualifiers:',qualifiers[0], 'regex:', helper)

      if (qualifiers.includes(helper)) {
        newQualifiers = qualifiers.slice(0,qualifiers.indexOf(helper))
        console.log('up until helper', newQualifiers)

        newQualifiers = newQualifiers.concat(qualifiers
          .slice(qualifiers.indexOf(helper)+1, qualifiers.length+1))

        console.log('from helper til end', newQualifiers)

        if (id !== 'in:everywhere') {
          newQualifiers.push(`+${id}`)}
        console.log('after adding new qualifier', newQualifiers)
        setQualifiers(newQualifiers)}
    } else
    if (id !== 'in:everywhere') {
      setQualifiers(qualifiers.concat(`+${id}`))
    }
  }

  return (
    <div className="form-field">
      <label className="input-label">Search by title, body or comments?
      </label>
      <span >
        <select 
          id='titleBodyComment' 
          className="picklist" 
          defaultValue='Everywhere' 
          onChange={titleBodyComment}>
          <option value='in:everywhere'>Everywhere</option>
          <option value='in:title'>Title</option>
          <option value='in:body'>Body</option>
          <option value='in:comments'>Comments</option>            
        </select>
      </span>
    </div>
  )
}

TitleBodyComment.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}


export default TitleBodyComment
