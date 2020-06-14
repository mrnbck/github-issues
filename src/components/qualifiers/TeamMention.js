import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const TeamMention = ({ 
  qualifiers, 
  setQualifiers, 
  teamMentionToggle }) => {

  const [inputField, setInputField] = useState('')
  const [search, setSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')

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
        document.getElementById('team-input').style.pointerEvents='none'
        document.getElementById('team-input')
          .style.backgroundColor='#fdfdfd'
        document.getElementById('team-input').style.color = '#a6a6a6'
        document.getElementById('team-input')
          .style.textTransform='uppercase'
        document.getElementById('org-input').style.pointerEvents='none'
        document.getElementById('org-input')
          .style.backgroundColor='#fdfdfd'
        document.getElementById('org-input').style.color = '#a6a6a6'
        document.getElementById('org-input')
          .style.textTransform='uppercase'
        setInputOnOff('RESET') 
      }
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

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)

    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        document.getElementById('team-input').style.pointerEvents ='auto'
        document.getElementById('team-input')
          .style.backgroundColor='white'
        document.getElementById('team-input').style.color = 'black'
        document.getElementById('team-input').style.textTransform = 
          'capitalize'
        document.getElementById('team-input').value = ''
        document.getElementById('org-input').style.pointerEvents ='auto'
        document.getElementById('org-input')
          .style.backgroundColor='white'
        document.getElementById('org-input').style.color = 'black'
        document.getElementById('org-input').style.textTransform = 
          'capitalize'
        document.getElementById('org-input').value = ''
      }
      setInputOnOff('OK')
      setSearch('')

    }
  }

  //based on value in select show the correct input fields
  const teamMentionInputField = () => {
    switch(inputField) {
    case 'team:ORGNAME/TEAMNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className='input-field'
            id='org-input'
            placeholder='Enter organization' 
            ref={(element) => orgRef = element}
            onChange={inputFieldValue}
          />
          <input 
            className='input-field'
            id='team-input'
            placeholder='Enter team' 
            ref={(element) => teamRef = element}
            onChange={inputFieldValue}
          />
          <button className='OK-button'>{inputOnOff}
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
        <label className="input-label">Search by team mention?</label>
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