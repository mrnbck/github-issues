import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../../helpers/QualifierChecker'

const Assignee = ({ 
  qualifiers, 
  setQualifiers, 
  assigneeToggle,
  setMyIssues }) => {
    
  const [inputStyle, setInputStyle] = useState('input-ok')
  const [inputField, setInputField] = useState('')
  const [search, setSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')

  useEffect(() => {
    if (assigneeToggle === false) {
      
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /assignee:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id)
      }
    }
    // eslint-disable-next-line
    },[assigneeToggle])



  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])

  //use createRef to remember value from input fields
  let assigneeRef = createRef()
  
  //check which select option was chosen and save it in a state
  const selectFieldPicker = () => {

    const option = document.getElementById('assignee').options
    const id = option[option.selectedIndex].value
    
    setInputField(id) 
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (assigneeRef.value) {
      setSearch(`assignee:${assigneeRef.value}`)
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
    let assigneeRegex = /assignee:([\w])+/        


    //search in qualifiers if current qualifier already exists
    //check both regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      
      if (assigneeRegex.exec(value)) {
        return (assigneeRegex.exec(value))
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
    
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
    switch(inputField) {
    case 'assignee:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          id='assignee-input'
          placeholder='Enter Assignee'
          ref={(element) => assigneeRef = element}
          onChange={inputFieldValue}
        /><button className='button OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    default:
      return <span></span>
    }
  }

  if (assigneeToggle === false) {    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Assignee</label>
        <span >
          <select 
            id='assignee' 
            className="picklist" 
            defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='assignee:USERNAME'>Assignee</option>
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

Assignee.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func

}

export default Assignee