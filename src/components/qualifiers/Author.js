import React, { useState, createRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Author = ({ 
  qualifiers, 
  setQualifiers, 
  authorToggle }) => {

  useEffect(() => {
    if (authorToggle === false) {
        
      //remove qualifier when untoggled
      let id = 'no filter'
      let authorRegex = /author:([\w])+/        
      let intAccountRegex = /author:app\/([\w])+/ 
        
      const findAuthor = qualifiers.filter(value => authorRegex.exec(value))
      if (findAuthor.length > 0) {
        QualifierChecker(findAuthor, qualifiers, setQualifiers, id)
      } else {
        const intAccount = qualifiers.filter(value => 
          intAccountRegex.exec(value))
        if (intAccount.length > 0) {
          QualifierChecker(intAccount, qualifiers, setQualifiers, id)
        }
      }
    }
    // eslint-disable-next-line
      },[authorToggle])  
  
  const [inputField, setInputField] = useState('')
  const [authorSearch, setAuthorSearch] = useState('')
  const [intAccountSearch, setIntAccountSearch] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])

  //use createRef to remember value from input fields
  let authorRef = createRef()
  let intAccountRef = createRef()

  //check which select option was chosen and save it in a state
  const selectFieldPicker = () => {

    const option = document.getElementById('author').options
    const id = option[option.selectedIndex].value
    
    setInputField(id) 
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (authorRef.value) {
      setAuthorSearch(`author:${authorRef.value}`)
    }
    if (intAccountRef.value) {
      setIntAccountSearch(`author:app/${intAccountRef.value}`)
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
    if (authorSearch) {
      id = authorSearch
    }
    if (intAccountSearch) {
      id = intAccountSearch
    }  
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    if (inputOnOff === 'OK' && 
      //only reset when not empty. otherwise it will change every time due to 
      //useEffect()
      (authorSearch !== '' || intAccountSearch !== '')
    ) {
      if (inputField !== 'no filter') {
        document.getElementById('author-input').style.pointerEvents = 'none'
        document.getElementById('author-input').style.backgroundColor='#fdfdfd'
        document.getElementById('author-input').style.color = '#a6a6a6'
        document.getElementById('author-input').style.textTransform='uppercase'
        setInputOnOff('RESET') 
      }
    }

    //create regex based on value in "id"
    let authorRegex = /author:([\w])+/        
    let intAccountRegex = /author:app\/([\w])+/  

    //search in qualifiers if current qualifier already exists
    //check both regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      
      if (authorRegex.exec(value)) {
        return (authorRegex.exec(value))
      }
      if (intAccountRegex.exec(value)) {
        return (intAccountRegex.exec(value))
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)

    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        document.getElementById('author-input').style.pointerEvents = 'auto'
        document.getElementById('author-input').style.backgroundColor = 'white'
        document.getElementById('author-input').style.color = 'black'
        document.getElementById('author-input').style.textTransform = 
          'capitalize'
        document.getElementById('author-input').value = ''
      }
      setInputOnOff('OK')
      setAuthorSearch('')

    }
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
    switch(inputField) {
    case 'author:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='author-input'
          placeholder='Enter Author' 
          ref={(element) => authorRef = element}
          onChange={inputFieldValue}
        /><button id='author-input-button' className='OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'author:app/USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='author-input'
          placeholder='Enter Integration Account'
          ref={(element) => intAccountRef = element}
          onChange={inputFieldValue}
        /><button className='OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    default:
      return <span></span>
    }
  }

  if (authorToggle === false) {    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Author</label>
        <span >
          <select 
            id='author' 
            className="picklist" 
            defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='author:USERNAME'>Author</option>
            <option value='author:app/USERNAME'>Integration Account</option>
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

Author.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func

}

export default Author