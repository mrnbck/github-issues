import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Reactions = ({ 
  qualifiers, 
  setQualifiers,
  reactionsToggle }) => {

  const [inputField, setInputField] = useState('')
  const [moreThanSearch, setMoreThanSearch] = useState('')
  const [lessThanSearch, setLessThenSearch] = useState('')
  const [rangeSearch, setRangeSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')

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
      document.getElementById('reactions').options

    const id = 
      option[option.selectedIndex].value

    console.log('id', id)

    setInputField(id)    
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (moreThanRef.value) {
      setMoreThanSearch(`reactions:>${moreThanRef.value}`)
    }
    if (lessThanRef.value) {
      setLessThenSearch(`reactions:<${lessThanRef.value}`)
    }
    if (rangeRef.value) {
      setRangeSearch(`reactions:${moreThanRef.value}..${rangeRef.value}`)
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
        document.getElementById('input-field').style.pointerEvents = 'none'
        document.getElementById('input-field').style.backgroundColor='#fdfdfd'
        document.getElementById('input-field').style.color = '#a6a6a6'
        document.getElementById('input-field').style.textTransform='uppercase'
        if(document.getElementById('range-input')) {
          document.getElementById('range-input').style.pointerEvents = 'none'
          document.getElementById('range-input').style.backgroundColor =
          '#fdfdfd'
          document.getElementById('range-input').style.color='#a6a6a6'
          document.getElementById('range-input').style.textTransform =
          'uppercase'
        }
        setInputOnOff('RESET') 
      }
    }

    //create regex based on value in "id"
    let moreThanRegex = /reactions:>([\d])+/        
    let lessThanRegex = /reactions:<([\d])+/        
    let rangeRegex = /reactions:([\d])+..[\d]+/

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

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
      
    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        document.getElementById('input-field').style.pointerEvents = 'auto'
        document.getElementById('input-field').style.backgroundColor = 'white'
        document.getElementById('input-field').style.color = 'black'
        document.getElementById('input-field').style.textTransform = 
          'capitalize'
        document.getElementById('input-field').value = ''
        if(document.getElementById('range-input')) {
          document.getElementById('range-input').style.pointerEvents = 'auto'
          document.getElementById('range-input').style.backgroundColor='white'
          document.getElementById('range-input').style.color = 'black'
          document.getElementById('range-input').style.textTransform=
            'capitalize'
          document.getElementById('range-input').value = ''
        }
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
    case 'reactions:>n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='input-field'
          placeholder='Enter Number of Reactions' 
          ref={(element) => moreThanRef = element}
          onChange={inputFieldValue}
        /><button className='OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'reactions:<n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='input-field'
          placeholder='Enter Number of Reactions'
          ref={(element) => lessThanRef = element}
          onChange={inputFieldValue}
        /><button className='OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'reactions:n..m': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className='input-field'
            id='input-field'
            placeholder='Enter Number of Reactions' 
            ref={(element) => moreThanRef = element}
            onChange={inputFieldValue}
          />        
          <input 
            className='input-field'
            id='range-input'
            placeholder='Enter Number of Reactions' 
            ref={(element) => rangeRef = element}
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

  if (reactionsToggle === false) {
    return (<div></div>)
  } else

    return (
      <div className="form-field">
        <label className="input-label">
          Search by Number of Reactions
        </label>
        <span >
          <select 
            id='reactions'
            className="picklist" 
            defaultValue='Everywhere'
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='reactions:>n'>More Than</option>
            <option value='reactions:<n'>Less Than</option>
            <option value='reactions:n..m'>Range</option>            
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

Reactions.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
}

export default Reactions