import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Assignee = ({ 
  qualifiers, 
  setQualifiers, 
  assigneeToggle }) => {

  const [inputField, setInputField] = useState('')
  const [assigneeSearch, setAssigneeSearch] = useState('')
  const [assigneeInput, setAssigneeInput] = useState('OK')

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])

  //use createRef to remember value from input fields
  let assigneeRef = createRef()
  
  //check which select option was chosen and save it in a state
  const author = () => {

    const assignee = document.getElementById('assignee').options
    const id = assignee[assignee.selectedIndex].value
    
    setInputField(id) 
  }

  //track value in input field and save it in the correct state 
  const authorValue = () => {
    if (assigneeRef.value) {
      setAssigneeSearch(`assignee:${assigneeRef.value}`)
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
    if (assigneeSearch) {
      id = assigneeSearch
    }
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    if (assigneeInput === 'OK' && 
      //only reset when not empty. otherwise it will change every time due to 
      //useEffect()
      (assigneeSearch !== '')
    ) {
      if (inputField !== 'no filter') {
        document.getElementById('assignee-input').style.pointerEvents = 'none'
        document.getElementById('assignee-input')
          .style.backgroundColor='#fdfdfd'
        document.getElementById('assignee-input').style.color = '#a6a6a6'
        document.getElementById('assignee-input')
          .style.textTransform='uppercase'
        setAssigneeInput('RESET') 
      }
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


    QualifierChecker(findEntry, qualifiers, setQualifiers, id)

    if(assigneeInput === 'RESET') {
      if (inputField !== 'no filter') {
        document.getElementById('assignee-input').style.pointerEvents = 'auto'
        document.getElementById('assignee-input').style.backgroundColor='white'
        document.getElementById('assignee-input').style.color = 'black'
        document.getElementById('assignee-input').style.textTransform = 
          'capitalize'
        document.getElementById('assignee-input').value = ''
      }
      setAssigneeInput('OK')
      setAssigneeSearch('')

    }
  }

  //based on value in select show the correct input fields
  const assigneeInputField = () => {
    switch(inputField) {
    case 'assignee:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='assignee-input'
          placeholder='Enter Assignee' 
          ref={(element) => assigneeRef = element}
          onChange={authorValue}
        /><button className='OK-button'>{assigneeInput}
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
        <label className="input-label">Search by assignee?</label>
        <span >
          <select 
            id='assignee' 
            className="picklist" 
            defaultValue='Both' 
            onChange={author}>
            <option value='no filter'>All</option>
            <option value='assignee:USERNAME'>Assignee</option>
          </select>
        </span>
        {assigneeInputField()}
      </div>
    )

}

Assignee.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func

}

export default Assignee