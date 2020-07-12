import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const TeamMention = ({ 
  qualifiers, 
  setQualifiers, 
  teamMentionToggle,
  setMyIssues }) => {

  const [inputField, setInputField] = useState('')
  const [search, setSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')
  const [inputStyle, setInputStyle] = useState('input-ok')

  useEffect(() => {
    if (teamMentionToggle === false) {
      
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /team:([\w])+\/[\w]+/ 
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
      }
    }
    // eslint-disable-next-line
    },[teamMentionToggle])

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])

  //use createRef to remember value from input fields
  let orgRef  = createRef()
  let teamRef = createRef()  
  
  //check which select option was chosen and save it in a state
  const selectFieldPicker = () => {

    const option = document.getElementById('teamMention').options
    const id = option[option.selectedIndex].value
    
    setInputField(id) 
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (teamRef.value) {
      setSearch(`team:${orgRef.value}/${teamRef.value}`)
    }
  }

  //make the field 'output only' after submit. save value in respective state.
  const handleSubmit = (event) => {
    event.preventDefault()
    handleInputFields()
  }

  const handleInputFields = () => {
    //check if there is an input field or if the option is "everywhere"
    let id = ''
    //check which field was used
    if (search) {
      id = search
    }
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    if (inputOnOff === 'OK' && 
      //only reset when not empty. otherwise it will change every time due to 
      //useEffect()
      (search !== '')
    ) {
      if (inputField !== 'no filter') {
        setInputStyle('input-reset')
        setInputOnOff('RESET') 
      }
    }

    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        setInputStyle('input-ok')
      }
      setInputOnOff('OK')
      setSearch('')
    }

    //create regex based on value in "id"
    let regex = /team:([\w])+\/[\w]+/        

    //search in qualifiers if current qualifier already exists
    //check both regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      
      if (regex.exec(value)) {
        return (regex.exec(value))
      }
      return null
    })
    //console.log('findEntry',findEntry)

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)

  }

  //based on value in select show the correct input fields
  const teamMentionInputField = () => {
    switch(inputField) {
    case 'team:ORGNAME/TEAMNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className={`input-field ${inputStyle}`}
            id='org-input'
            placeholder='Enter organization' 
            ref={(element) => orgRef = element}
            onChange={inputFieldValue}
          />
          <input 
            className={`input-field ${inputStyle}`}
            id='team-input'
            placeholder='Enter team' 
            ref={(element) => teamRef = element}
            onChange={inputFieldValue}
          />
          <button className='button OK-button'>{inputOnOff}
          </button>
        </form>
      </span>
    default:
      return <span></span>
    }
  }

  if (teamMentionToggle === false) {    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Team Mention</label>
        <span >
          <select 
            id='teamMention' 
            className="picklist" 
            defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='team:ORGNAME/TEAMNAME'>Mentioned Team</option>
          </select>
        </span>
        {teamMentionInputField()}
      </div>
    )

}

TeamMention.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func

}

export default TeamMention