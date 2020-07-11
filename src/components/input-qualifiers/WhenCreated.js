import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const NumberOfComments = ({ 
  qualifiers, 
  setQualifiers,
  whenCreatedToggle }) => {

  const [inputField, setInputField] = useState('')
  const [moreThanSearch, setMoreThanSearch] = useState('')
  const [lessThanSearch, setLessThenSearch] = useState('')
  const [rangeSearch, setRangeSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')

  useEffect(() => {
    if (whenCreatedToggle === false) {
      //remove qualifier when untoggled
      let id = 'no filter'
      let moreThanRegex = /created:>(\d){4}-(\d){2}-(\d){2}/        
      let lessThanRegex = /created:<(\d){4}-(\d){2}-(\d){2}/       
      let rangeRegex = 
      /created:(\d){4}-(\d){2}-(\d){2}..(\d){4}-(\d){2}-(\d){2}/ 
        
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
      },[whenCreatedToggle]) 

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
      document.getElementById('whenCreated').options

    const id = 
      option[option.selectedIndex].value

    //console.log('id', id)

    setInputField(id)    
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (moreThanRef.value) {
      setMoreThanSearch(`created:>${moreThanRef.value}`)
    }
    if (lessThanRef.value) {
      setLessThenSearch(`created:<${lessThanRef.value}`)
    }
    if (rangeRef.value) {
      setRangeSearch(`created:${moreThanRef.value}..${rangeRef.value}`)
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
        document.getElementById('created-input-field')
          .style.pointerEvents = 'none'
        document.getElementById('created-input-field')
          .style.backgroundColor='#fdfdfd'
        document.getElementById('created-input-field').style.color = '#a6a6a6'
        document.getElementById('created-input-field')
          .style.textTransform='uppercase'
        if(document.getElementById('created-range-input')) {
          document.getElementById('created-range-input')
            .style.pointerEvents = 'none'
          document.getElementById('created-range-input')
            .style.backgroundColor =
          '#fdfdfd'
          document.getElementById('created-range-input').style.color='#a6a6a6'
          document.getElementById('created-range-input').style.textTransform =
          'uppercase'
        }
        setInputOnOff('RESET') 
      }
    }

    //create regex based on value in "id"
    let moreThanRegex = /created:>(\d){4}-(\d){2}-(\d){2}/        
    let lessThanRegex = /created:<(\d){4}-(\d){2}-(\d){2}/       
    let rangeRegex = 
    /created:(\d){4}-(\d){2}-(\d){2}..(\d){4}-(\d){2}-(\d){2}/ 

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
        document.getElementById('created-input-field')
          .style.pointerEvents = 'auto'
        document.getElementById('created-input-field')
          .style.backgroundColor = 'white'
        document.getElementById('created-input-field').style.color = 'black'
        document.getElementById('created-input-field').style.textTransform = 
          'capitalize'
        document.getElementById('created-input-field').value = ''
        if(document.getElementById('created-range-input')) {
          document.getElementById('created-range-input')
            .style.pointerEvents = 'auto'
          document.getElementById('created-range-input')
            .style.backgroundColor='white'
          document.getElementById('created-range-input').style.color = 'black'
          document.getElementById('created-range-input').style.textTransform=
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
    case 'created:>n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          type='date'
          id='created-input-field'
          placeholder='Enter Date YYYY-MM-DD' 
          ref={(element) => moreThanRef = element}
          onChange={inputFieldValue}
        /><button className='OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'created:<n': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          type='date'
          id='created-input-field'
          placeholder='Enter Date YYYY-MM-DD'
          ref={(element) => lessThanRef = element}
          onChange={inputFieldValue}
        /><button className='OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'created:n..m': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className='input-field'
            type='date'
            id='created-input-field'
            placeholder='Enter Date YYYY-MM-DD' 
            ref={(element) => moreThanRef = element}
            onChange={inputFieldValue}
          />        
          <input 
            className='input-field'
            type='date'
            id='created-range-input'
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

  if (whenCreatedToggle === false) {
    return (<div></div>)
  } else

    return (
      <div className="form-field">
        <label className="input-label">
          When Created
        </label>
        <span >
          <select 
            id='whenCreated'
            className="picklist" 
            defaultValue='Everywhere'
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='created:>n'>Later Than</option>
            <option value='created:<n'>Before</option>
            <option value='created:n..m'>Range</option>            
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