import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Mention = ({ 
  qualifiers, 
  setQualifiers, 
  mentionToggle }) => {

  const [inputField, setInputField] = useState('')
  const [mentionSearch, setMentionSearch] = useState('')
  const [mentionInput, setMentionInput] = useState('OK')

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])

  //use createRef to remember value from input fields
  let mentionRef = createRef()
  
  //check which select option was chosen and save it in a state
  const mention = () => {

    const mention = document.getElementById('mention').options
    const id = mention[mention.selectedIndex].value
    
    setInputField(id) 
  }

  //track value in input field and save it in the correct state 
  const mentionValue = () => {
    if (mentionRef.value) {
      setMentionSearch(`mentions:${mentionRef.value}`)
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
    if (mentionSearch) {
      id = mentionSearch
    }
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    if (mentionInput === 'OK' && 
      //only reset when not empty. otherwise it will change every time due to 
      //useEffect()
      (mentionSearch !== '')
    ) {
      if (inputField !== 'no filter') {
        document.getElementById('mention-input').style.pointerEvents = 'none'
        document.getElementById('mention-input')
          .style.backgroundColor='#fdfdfd'
        document.getElementById('mention-input').style.color = '#a6a6a6'
        document.getElementById('mention-input')
          .style.textTransform='uppercase'
        setMentionInput('RESET') 
      }
    }

    //create regex based on value in "id"
    let mentionRegex = /mentions:([\w])+/        


    //search in qualifiers if current qualifier already exists
    //check both regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      
      if (mentionRegex.exec(value)) {
        return (mentionRegex.exec(value))
      }
      return null
    })


    QualifierChecker(findEntry, qualifiers, setQualifiers, id)

    if(mentionInput === 'RESET') {
      if (inputField !== 'no filter') {
        document.getElementById('assignee-input').style.pointerEvents = 'auto'
        document.getElementById('assignee-input').style.backgroundColor='white'
        document.getElementById('assignee-input').style.color = 'black'
        document.getElementById('assignee-input').style.textTransform = 
          'capitalize'
        document.getElementById('assignee-input').value = ''
      }
      setMentionInput('OK')
      setMentionSearch('')

    }
  }

  //based on value in select show the correct input fields
  const mentionInputField = () => {
    switch(inputField) {
    case 'mentions:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='mention-input'
          placeholder='Enter mentioned username' 
          ref={(element) => mentionRef = element}
          onChange={mentionValue}
        /><button className='OK-button'>{mentionInput}
        </button>
        </form>
      </span>
    default:
      return <span></span>
    }
  }

  if (mentionToggle === false) {    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Search by mention?</label>
        <span >
          <select 
            id='mention' 
            className="picklist" 
            defaultValue='Both' 
            onChange={mention}>
            <option value='no filter'>All</option>
            <option value='mentions:USERNAME'>Mentioned Username</option>
          </select>
        </span>
        {mentionInputField()}
      </div>
    )

}

Mention.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func

}

export default Mention