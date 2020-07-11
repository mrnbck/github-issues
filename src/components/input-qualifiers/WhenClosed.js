import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const NumberOfComments = ({ 
  qualifiers, 
  setQualifiers,
  whenClosedToggle }) => {

  const [inputField, setInputField] = useState('')
  const [moreThanSearch, setMoreThanSearch] = useState('')
  const [lessThanSearch, setLessThenSearch] = useState('')
  const [rangeSearch, setRangeSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')

  useEffect(() => {
    if (whenClosedToggle === false) {
      //remove qualifier when untoggled
      let id = 'no filter'
      let moreThanRegex = /closed:>(\d){4}-(\d){2}-(\d){2}/        
      let lessThanRegex = /closed:<(\d){4}-(\d){2}-(\d){2}/       
      let rangeRegex = 
      /closed:(\d){4}-(\d){2}-(\d){2}..(\d){4}-(\d){2}-(\d){2}/ 
        
      //check if any of the qualifiers is used by searching the regex. if true, 
      //the others will result in blank.
      const moreThan = qualifiers.filter(value => moreThanRegex.exec(value))
      if (moreThan.length > 0) {
        QualifierChecker(moreThan, qualifiers, setQualifiers, id)
      } else {
        const lessThan = qualifiers.filter(value => lessThanRegex.exec(value))
        if (lessThan.length > 0) {
          QualifierChecker(lessThan, qualifiers, setQualifiers, id)
        } else {
          const range = qualifiers.filter(value => rangeRegex.exec(value))
          if (range.length > 0) {
            QualifierChecker(range, qualifiers, setQualifiers, id)
          }
        }
      }
    }
    // eslint-disable-next-line
      },[whenClosedToggle]) 

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
      document.getElementById('whenClosed').options

    const id = 
      option[option.selectedIndex].value

    //console.log('id', id)

    setInputField(id)    
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (moreThanRef.value) {
      setMoreThanSearch(`closed:>${moreThanRef.value}`)
    }
    if (lessThanRef.value) {
      setLessThenSearch(`closed:<${lessThanRef.value}`)
    }
    if (rangeRef.value) {
      setRangeSearch(`closed:${moreThanRef.value}..${rangeRef.value}`)
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
        document.getElementById('closed-input-field')
          .style.pointerEvents = 'none'
        document.getElementById('closed-input-field')
          .style.backgroundColor='#fdfdfd'
        document.getElementById('closed-input-field')
          .style.color = '#a6a6a6'
        document.getElementById('closed-input-field')
          .style.textTransform='uppercase'
        if(document.getElementById('closed-range-input')) {
          document.getElementById('closed-range-input')
            .style.pointerEvents = 'none'
          document.getElementById('closed-range-input')
            .style.backgroundColor = '#fdfdfd'
          document.getElementById('closed-range-input').style.color='#a6a6a6'
          document.getElementById('closed-range-input').style.textTransform =
          'uppercase'
        }
        setInputOnOff('RESET') 
      }
    }

    //create regex based on value in "id"
    let moreThanRegex = /closed:>(\d){4}-(\d){2}-(\d){2}/        
    let lessThanRegex = /closed:<(\d){4}-(\d){2}-(\d){2}/       
    let rangeRegex = 
    /closed:(\d){4}-(\d){2}-(\d){2}..(\d){4}-(\d){2}-(\d){2}/ 

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
        document.getElementById('closed-input-field')
          .style.pointerEvents = 'auto'
        document.getElementById('closed-input-field')
          .style.backgroundColor = 'white'
        document.getElementById('closed-input-field').style.color = 'black'
        document.getElementById('closed-input-field').style.textTransform = 
          'capitalize'
        document.getElementById('closed-input-field').value = ''
        if(document.getElementById('closed-range-input')) {
          document.getElementById('closed-range-input')
            .style.pointerEvents = 'auto'
          document.getElementById('closed-range-input')
            .style.backgroundColor='white'
          document.getElementById('closed-range-input').style.color = 'black'
          document.getElementById('closed-range-input').style.textTransform=
            'capitalize'
          document.getElementById('closed-range-input').value = ''
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
    case 'closed:>n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          type='date'
          id='closed-input-field'
          placeholder='Enter Date YYYY-MM-DD' 
          ref={(element) => moreThanRef = element}
          onChange={inputFieldValue}
        /><button className='OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'closed:<n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          type='date'
          id='closed-input-field'
          placeholder='Enter Date YYYY-MM-DD'
          ref={(element) => lessThanRef = element}
          onChange={inputFieldValue}
        /><button className='OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'closed:n..m': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className='input-field'
            type='date'
            id='closed-input-field'
            placeholder='Enter Date YYYY-MM-DD' 
            ref={(element) => moreThanRef = element}
            onChange={inputFieldValue}
          />        
          <input 
            className='input-field'
            type='date'
            id='closed-range-input'
            placeholder='Enter Date YYYY-MM-DD' 
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

  if (whenClosedToggle === false) {
    return (<div></div>)
  } else

    return (
      <div className="form-field">
        <label className="input-label">
          When Closed
        </label>
        <span >
          <select 
            id='whenClosed'
            className="picklist" 
            defaultValue='Everywhere'
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='closed:>n'>Later Than</option>
            <option value='closed:<n'>Before</option>
            <option value='closed:n..m'>Range</option>            
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