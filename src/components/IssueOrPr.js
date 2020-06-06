import React from 'react'
import PropTypes from 'prop-types'

const IssueOrPr = ({ qualifiers, setQualifiers }) => {

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const issueOrPr = () => {

    const issueOrPr = document.getElementById('issueOrPr').options
    const id = issueOrPr[issueOrPr.selectedIndex].value
    
    let regex = /\+type:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))
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

        if (id !== 'type:both') {
          newQualifiers.push(`+${id}`)}

        console.log('after adding new qualifier', newQualifiers)

        setQualifiers(newQualifiers)}
    } else if (id !== 'type:both') {
      setQualifiers(qualifiers.concat(`+${id}`))}
  }

  return (
    <div className="form-field">
      <h2>What would you like to search?</h2>
      <label className="input-label">Issues or Pull Requests?</label>
      <span >
        <select id='issueOrPr' className="picklist" defaultValue='Both' 
          onChange={issueOrPr}>
          <option value='type:both'>Both</option>
          <option value='type:issues'>Issues</option>
          <option value='type:pr'>Pull Requests</option>
        </select>
      </span>
    </div>
  )

}

IssueOrPr.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func
}

export default IssueOrPr