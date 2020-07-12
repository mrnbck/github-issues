import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const NumberOfComments = ({ 
  qualifiers, 
  setQualifiers,
  whenUpdatedToggle,
  setMyIssues }) => {

  const [inputField, setInputField] = useState('')
  const [moreThanSearch, setMoreThanSearch] = useState('')
  const [lessThanSearch, setLessThenSearch] = useState('')
  const [rangeSearch, setRangeSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')
  const [inputStyle, setInputStyle] = useState('input-ok')

  useEffect(() => {
    if (whenUpdatedToggle === false) {
      //remove qualifier when untoggled
      let id = 'no filter'
      let moreThanRegex = /updated:>(\d){4}-(\d){2}-(\d){2}/        
      let lessThanRegex = /updated:<(\d){4}-(\d){2}-(\d){2}/       
      let rangeRegex = 
      /updated:(\d){4}-(\d){2}-(\d){2}..(\d){4}-(\d){2}-(\d){2}/ 
        
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
      },[whenUpdatedToggle]) 

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
      document.getElementById('whenUpdated').options

    const id = 
      option[option.selectedIndex].value

    //console.log('id', id)

    setInputField(id)    
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (moreThanRef.value) {
      setMoreThanSearch(`updated:>${moreThanRef.value}`)
    }
    if (lessThanRef.value) {
      setLessThenSearch(`updated:<${lessThanRef.value}`)
    }
    if (rangeRef.value) {
      setRangeSearch(`updated:${moreThanRef.value}..${rangeRef.value}`)
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
        setInputOnOff('RESET') 
      }
    }

    //create regex based on value in "id"
    let moreThanRegex = /updated:>(\d){4}-(\d){2}-(\d){2}/        
    let lessThanRegex = /updated:<(\d){4}-(\d){2}-(\d){2}/       
    let rangeRegex = 
    /updated:(\d){4}-(\d){2}-(\d){2}..(\d){4}-(\d){2}-(\d){2}/ 

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
      
    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        setInputStyle('input-ok')
      }
      setInputOnOff('OK')
      setMoreThanSearch('')
      setLessThenSearch('')
      setRangeSearch('')
    }
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
  
    switch(inputField) {
    case 'updated:>n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          type='date'
          id='updated-input-field'
          placeholder='Enter Date YYYY-MM-DD' 
          ref={(element) => moreThanRef = element}
          onChange={inputFieldValue}
        /><button className='button OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'updated:<n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          type='date'
          id='updated-input-field'
          placeholder='Enter Date YYYY-MM-DD'
          ref={(element) => lessThanRef = element}
          onChange={inputFieldValue}
        /><button className='button OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'updated:n..m': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className={`input-field ${inputStyle}`}
            type='date'
            id='updated-input-field'
            placeholder='Enter Date YYYY-MM-DD' 
            ref={(element) => moreThanRef = element}
            onChange={inputFieldValue}
          />        
          <input 
            className={`input-field ${inputStyle}`}
            type='date'
            id='updated-range-input'
            placeholder='Enter Date YYYY-MM-DD' 
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

  if (whenUpdatedToggle === false) {
    return (<div></div>)
  } else

    return (
      <div className="form-field">
        <label className="input-label">
          When Updated
        </label>
        <span >
          <select 
            id='whenUpdated'
            className="picklist" 
            defaultValue='Everywhere'
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='updated:>n'>Later Than</option>
            <option value='updated:<n'>Before</option>
            <option value='updated:n..m'>Range</option>            
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

NumberOfComments.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
}

export default NumberOfComments