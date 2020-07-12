import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Mention = ({ 
  qualifiers, 
  setQualifiers, 
  mentionToggle,
  setMyIssues }) => {

  useEffect(() => {
    if (mentionToggle === false) {
        
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /mentions:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
      }
    }
    // eslint-disable-next-line
      },[mentionToggle])
  
  const [inputField, setInputField] = useState('')
  const [search, setSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')
  const [inputStyle, setInputStyle] = useState('input-ok')

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])

  //use createRef to remember value from input fields
  let mentionRef = createRef()
  
  //check which select option was chosen and save it in a state
  const selectFieldPicker = () => {

    const option = document.getElementById('mention').options
    const id = option[option.selectedIndex].value
    
    setInputField(id) 
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (mentionRef.value) {
      setSearch(`mentions:${mentionRef.value}`)
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


    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)

    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        setInputStyle('input-ok')
      }
      setInputOnOff('OK')
      setSearch('')

    }
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
    switch(inputField) {
    case 'mentions:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          placeholder='Enter mentioned username' 
          ref={(element) => mentionRef = element}
          onChange={inputFieldValue}
        /><button className='button OK-button'>{inputOnOff}
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
        <label className="input-label">Mention</label>
        <span >
          <select 
            id='mention' 
            className="picklist" 
            defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='mentions:USERNAME'>Mentioned Username</option>
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

Mention.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func

}

export default Mention