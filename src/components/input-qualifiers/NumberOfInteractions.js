import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Interactions = ({ 
  qualifiers, 
  setQualifiers,
  interactionsToggle,
  setMyIssues }) => {

  const [inputField, setInputField] = useState('')
  const [moreThanSearch, setMoreThanSearch] = useState('')
  const [lessThanSearch, setLessThenSearch] = useState('')
  const [rangeSearch, setRangeSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')
  const [inputStyle, setInputStyle] = useState('input-ok')

  useEffect(() => {
    if (interactionsToggle === false) {
      //remove qualifier when untoggled
      let id = 'no filter'
      let moreThanRegex = /interactions:>([\d])+/        
      let lessThanRegex = /interactions:<([\d])+/        
      let rangeRegex = /interactions:([\d])+..[\d]+/
        
      //check if any of the qualifiers is used by searching the regex. if true, 
      //the others will result in blank.
      const moreThan = qualifiers.filter(value => moreThanRegex.exec(value))
      if (moreThan.length > 0) {
        QualifierChecker(moreThan, qualifiers, setQualifiers, id, setMyIssues)
      } else {
        const lessThan = qualifiers.filter(value => lessThanRegex.exec(value))
        if (lessThan.length > 0) {
          QualifierChecker(lessThan, qualifiers, setQualifiers, id, setMyIssues)
        } else {
          const range = qualifiers.filter(value => rangeRegex.exec(value))
          if (range.length > 0) {
            QualifierChecker(range, qualifiers, setQualifiers, id, setMyIssues)
          }
        }
      }
    }
    // eslint-disable-next-line
      },[interactionsToggle]) 

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])


  //use createRef to remember value from input fields
  let moreThanRef = createRef()
  let lessThanRef = createRef()
  let rangeRef = createRef()

  //check which select option was chosen and save it in a state
  const selectFieldPicker = () => {

    const option = 
      document.getElementById('interactions').options

    const id = 
      option[option.selectedIndex].value

    setInputField(id)    
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (moreThanRef.value) {
      setMoreThanSearch(`interactions:>${moreThanRef.value}`)
    }
    if (lessThanRef.value) {
      setLessThenSearch(`interactions:<${lessThanRef.value}`)
    }
    if (rangeRef.value) {
      setRangeSearch(`interactions:${moreThanRef.value}..${rangeRef.value}`)
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
    if (rangeSearch) {
      id = rangeSearch
    }
    if (lessThanSearch) {
      id = lessThanSearch
    }  
    if (moreThanSearch && !rangeSearch) {
      id = moreThanSearch
    }
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    if (inputOnOff === 'OK' && 
    //only reset when not empty. otherwise it will change every time due to 
    //useEffect()
    (moreThanSearch !== '' || lessThanSearch !== '' || rangeSearch !== '')
    ) {
      if (inputField !== 'no filter') {
        setInputStyle('input-reset')
      }
      setInputOnOff('RESET') 
    }

    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        setInputStyle('input-ok')
      }
      setInputOnOff('OK')
      setMoreThanSearch('')
      setLessThenSearch('')
      setRangeSearch('')
    }

    //create regex based on value in "id"
    let moreThanRegex = /interactions:>([\d])+/        
    let lessThanRegex = /interactions:<([\d])+/        
    let rangeRegex = /interactions:([\d])+..[\d]+/

    //search in qualifiers if current qualifier already exists
    //check all 3 regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      console.log(moreThanRegex.exec(value))
      if (moreThanRegex.exec(value)) {
        return (moreThanRegex.exec(value))
      }
      if (lessThanRegex.exec(value)) {
        return (lessThanRegex.exec(value))
      }
      if (rangeRegex.exec(value)) {
        return (rangeRegex.exec(value))
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
      
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
  
    switch(inputField) {
    case 'interactions:>n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          id='input-field'
          placeholder='Enter Number of Interactions' 
          ref={(element) => moreThanRef = element}
          onChange={inputFieldValue}
        /><button className='button OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'interactions:<n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          id='input-field'
          placeholder='Enter Number of Interactions'
          ref={(element) => lessThanRef = element}
          onChange={inputFieldValue}
        /><button className='button OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'interactions:n..m': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className={`input-field ${inputStyle}`}
            id='input-field'
            placeholder='Enter Number of Interactions' 
            ref={(element) => moreThanRef = element}
            onChange={inputFieldValue}
          />        
          <input 
            className={`input-field ${inputStyle}`}
            id='range-input'
            placeholder='Enter Number of Interactions' 
            ref={(element) => rangeRef = element}
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

  if (interactionsToggle === false) {
    return (<div></div>)
  } else

    return (
      <div className="form-field">
        <label className="input-label">
          Number of Interactions
        </label>
        <span >
          <select 
            id='interactions'
            className="picklist" 
            defaultValue='Everywhere'
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='interactions:>n'>More Than</option>
            <option value='interactions:<n'>Less Than</option>
            <option value='interactions:n..m'>Range</option>            
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

Interactions.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
}

export default Interactions