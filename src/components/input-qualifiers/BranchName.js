import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const BranchName = ({ 
  qualifiers, 
  setQualifiers, 
  branchToggle,
  setMyIssues }) => {

  const [inputStyle, setInputStyle] = useState('input-ok')
  const [inputField, setInputField] = useState('')
  const [baseSearch, setBaseSearch] = useState('')
  const [headSearch, setHeadSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')

  useEffect(() => {
    if (branchToggle === false) {
      //remove qualifier when untoggled
      let id = 'no filter'
      let branchRegex = /base:([\w])+/        
      let headRegex = /head:([\w])+/ 
        
      //check if any of the qualifiers is used by searching the regex. if true, 
      //the others will result in blank.
      const branchName = qualifiers.filter(value => branchRegex.exec(value))
      const headBranch = qualifiers.filter(value => headRegex.exec(value))
      if (branchName.length > 0) {
        QualifierChecker(branchName, qualifiers, setQualifiers, id, setMyIssues)
      } 
      if (headBranch.length > 0) {
        QualifierChecker(headBranch, qualifiers, setQualifiers, id, setMyIssues)
      }
    }
    // eslint-disable-next-line
      },[branchToggle]) 

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])

  //use createRef to remember value from input fields
  let baseRef  = createRef()
  let headRef = createRef()  
  
  //check which select option was chosen and save it in a state
  const selectFieldPicker = () => {

    const option = document.getElementById('branch').options
    const id = option[option.selectedIndex].value
    
    setInputField(id) 
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (headRef.value) {
      setBaseSearch(`head:${headRef.value}`)
    }
    if (baseRef.value) {
      setBaseSearch(`base:${baseRef.value}`)
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
    if (baseSearch) {
      id = baseSearch
    }
    if (headSearch) {
      id = headSearch
    }
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    //only reset when not empty. otherwise it will change every time due to 
    //useEffect()      
    if (inputOnOff === 'OK' && (baseSearch !== '' || headSearch !== ''))
    { 
      if (inputField !== 'no filter') 
      {
        setInputStyle('input-reset')
        setInputOnOff('RESET')
      }
    }

    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        setInputStyle('input-ok')
      }
      setInputOnOff('OK')
      setBaseSearch('')
      setHeadSearch('')
    }

    //create regex based on value in "id"
    let baseRegex = /base:([\w])+/
    let headRegex = /head:([\w])+/        


    //search in qualifiers if current qualifier already exists
    //check both regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      
      if (baseRegex.exec(value)) {
        return (baseRegex.exec(value))
      }
      if (headRegex.exec(value)) {
        return (headRegex.exec(value))
      }
      return null
    })
    //console.log('findEntry',findEntry)

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
    switch(inputField) {
    case 'base:BASE_BRANCH': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className={`input-field ${inputStyle}`}
            id='base-input'
            placeholder='Enter Base Branch' 
            ref={(element) => baseRef = element}
            onChange={inputFieldValue}
          />
          <button className='button OK-button'>{inputOnOff}
          </button>
        </form>
      </span>
    case 'head:HEAD_BRANCH': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className={`input-field ${inputStyle}`}
            id='base-input'
            placeholder='Enter Head Branch' 
            ref={(element) => headRef = element}
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

  if (branchToggle === false) {    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Branch Name</label>
        <span >
          <select 
            id='branch' 
            className="picklist" 
            defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='base:BASE_BRANCH'>Base Branch</option>
            <option value='head:HEAD_BRANCH'>Head Branch</option>
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

BranchName.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func

}

export default BranchName