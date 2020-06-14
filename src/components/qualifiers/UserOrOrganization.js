import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const UserOrOrganization = ({ 
  qualifiers, 
  setQualifiers,
  userOrOrgToggle }) => {

  const [inputField, setInputField] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [orgSearch, setOrgSearch] = useState('')
  const [repoSearch, setRepoSearch] = useState('')
  const [userInput, setUserInput] = useState('OK')

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])


  //use createRef to remember value from input fields
  let userRef = createRef()
  let orgRef = createRef()
  let repositoryRef = createRef()

  //check which select option was chosen and save it in a state
  const selectFieldPicker = () => {

    const option = 
      document.getElementById('userOrOrganization').options

    const id = 
      option[option.selectedIndex].value

    console.log('id', id)

    //remember whether USERNAME, ORGANIZATION or REPO
    setInputField(id)    
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (userRef.value) {
      setUserSearch(`user:${userRef.value}`)
    }
    if (orgRef.value) {
      setOrgSearch(`org:${orgRef.value}`)
    }
    if (repositoryRef.value) {
      setRepoSearch(`repo:${userRef.value}/${repositoryRef.value}`)
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
    if (repoSearch) {
      id = repoSearch
    }
    if (orgSearch) {
      id = orgSearch
    }  
    if (userSearch && !repoSearch) {
      id = userSearch
    }
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    if (userInput === 'OK' && 
    //only reset when not empty. otherwise it will change every time due to 
    //useEffect()
    (userSearch !== '' || orgSearch !== '' || repoSearch !== '')
    ) {
      if (inputField !== 'no filter') {
        document.getElementById('user-input').style.pointerEvents = 'none'
        document.getElementById('user-input').style.backgroundColor='#fdfdfd'
        document.getElementById('user-input').style.color = '#a6a6a6'
        document.getElementById('user-input').style.textTransform='uppercase'
        if(document.getElementById('repo-input')) {
          document.getElementById('repo-input').style.pointerEvents = 'none'
          document.getElementById('repo-input').style.backgroundColor =
          '#fdfdfd'
          document.getElementById('repo-input').style.color='#a6a6a6'
          document.getElementById('repo-input').style.textTransform =
          'uppercase'
        }
        setUserInput('RESET') 
      }
    }

    //create regex based on value in "id"
    let userRegex = /user:([\w])+/        
    let orgRegex = /org:([\w])+/        
    let repoRegex = /repo:([\w])+\/[\w]+/

    //search in qualifiers if current qualifier already exists
    //check all 3 regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      console.log(userRegex.exec(value))
      if (userRegex.exec(value)) {
        return (userRegex.exec(value))
      }
      if (orgRegex.exec(value)) {
        return (orgRegex.exec(value))
      }
      if (repoRegex.exec(value)) {
        return (repoRegex.exec(value))
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)
      
    if(userInput === 'RESET') {
      if (inputField !== 'no filter') {
        document.getElementById('user-input').style.pointerEvents = 'auto'
        document.getElementById('user-input').style.backgroundColor = 'white'
        document.getElementById('user-input').style.color = 'black'
        document.getElementById('user-input').style.textTransform = 
          'capitalize'
        document.getElementById('user-input').value = ''
        if(document.getElementById('repo-input')) {
          document.getElementById('repo-input').style.pointerEvents = 'auto'
          document.getElementById('repo-input').style.backgroundColor='white'
          document.getElementById('repo-input').style.color = 'black'
          document.getElementById('repo-input').style.textTransform=
            'capitalize'
          document.getElementById('repo-input').value = ''
        }
      }
      setUserInput('OK')
      setUserSearch('')
      setOrgSearch('')
      setRepoSearch('')
    }
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
  
    switch(inputField) {
    case 'user:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='user-input'
          placeholder='Enter Username' 
          ref={(element) => userRef = element}
          onChange={inputFieldValue}
        /><button id='user-input-button' className='OK-button'>{userInput}
        </button>
        </form>
      </span>
    case 'org:ORGANIZATION': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='input-field'
          id='user-input'
          placeholder='Enter Organization'
          ref={(element) => orgRef = element}
          onChange={inputFieldValue}
        /><button id='user-input-button' className='OK-button'>{userInput}
        </button>
        </form>
      </span>
    case 'repo:USERNAME/REPOSITORY': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className='input-field'
            id='user-input'
            placeholder='Enter Username' 
            ref={(element) => userRef = element}
            onChange={inputFieldValue}
          />        
          <input 
            className='input-field'
            id='repo-input'
            placeholder='Enter Repository' 
            ref={(element) => repositoryRef = element}
            onChange={inputFieldValue}
          />
          <button id='user-input-button' className='OK-button'>{userInput}
          </button>
        </form>
      </span>
    default: 
      return <span></span>
    }

  }

  if (userOrOrgToggle === false) {
    return (<div></div>)
  } else

    return (
      <div className="form-field">
        <label className="input-label">
          Search within a User&apos;s or Organization&apos;s Repositories
        </label>
        <span >
          <select 
            id='userOrOrganization'
            className="picklist" 
            defaultValue='Everywhere'
            onChange={selectFieldPicker}>
            <option value='no filter'>Everywhere</option>
            <option value='user:USERNAME'>Username</option>
            <option value='org:ORGANIZATION'>Organization</option>
            <option value='repo:USERNAME/REPOSITORY'>Username/Repository
            </option>            
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

UserOrOrganization.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
  userOrOrgToggle: PropTypes.bool,
}

export default UserOrOrganization