import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Assignee = ({ 
  qualifiers, 
  setQualifiers, 
  commenterToggle }) => {

  const [inputField, setInputField] = useState('')
  const [commenterSearch, setCommenterSearch] = useState('')
  const [commenterInput, setCommenterInput] = useState('OK')

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])

  //use createRef to remember value from input fields
  let commenterRef = createRef()
  
  //check which select option was chosen and save it in a state
  const commenter = () => {

    const commenter = document.getElementById('commenter').options
    const id = commenter[commenter.selectedIndex].value
    
    setInputField(id) 
  }

  //track value in input field and save it in the correct state 
  const commenterValue = () => {
    if (commenterRef.value) {
      setCommenterSearch(`commenter:${commenterRef.value}`)
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
    if (commenterSearch) {
      id = commenterSearch
    }
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    if (commenterInput === 'OK' && 
      //only reset when not empty. otherwise it will change every time due to 
      //useEffect()
      (commenterSearch !== '')
    ) {
      if (inputField !== 'no filter') {
        document.getElementById('input-field').style.pointerEvents = 'none'
        document.getElementById('input-field')
          .style.backgroundColor='#fdfdfd'
        document.getElementById('input-field').style.color = '#a6a6a6'
        document.getElementById('input-field')
          .style.textTransform='uppercase'
        setCommenterInput('RESET') 
      }
    }

    //create regex based on value in "id"
    let regex = /commenter:([\w])+/        


    //search in qualifiers if current qualifier already exists
    //check both regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      
      if (regex.exec(value)) {
        return (regex.exec(value))
      }
      return null
    })


    QualifierChecker(findEntry, qualifiers, setQualifiers, id)

    if(commenterInput === 'RESET') {
      if (inputField !== 'no filter') {
        document.getElementById('input-field').style.pointerEvents = 'auto'
        document.getElementById('input-field').style.backgroundColor='white'
        document.getElementById('input-field').style.color = 'black'
        document.getElementById('input-field').style.textTransform = 
          'capitalize'
        document.getElementById('input-field').value = ''
      }
      setCommenterInput('OK')
      setCommenterSearch('')

    }
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
    switch(inputField) {
    case 'commenter:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='input-field'
          placeholder='Enter commenter username' 
          ref={(element) => commenterRef = element}
          onChange={commenterValue}
        /><button className='OK-button'>{commenterInput}
        </button>
        </form>
      </span>
    default:
      return <span></span>
    }
  }

  if (commenterToggle === false) {    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Search by commenter?</label>
        <span >
          <select 
            id='commenter' 
            className="picklist" 
            defaultValue='Both' 
            onChange={commenter}>
            <option value='no filter'>All</option>
            <option value='commenter:USERNAME'>Commenter</option>
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