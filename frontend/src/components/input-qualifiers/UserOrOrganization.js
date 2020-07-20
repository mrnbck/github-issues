import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../../helpers/QualifierChecker'

const UserOrOrganization = ({ 
  qualifiers, 
  setQualifiers,
  userOrOrgToggle,
  setMyIssues
}) => {

  const [inputField, setInputField] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [orgSearch, setOrgSearch] = useState('')
  const [repoSearch, setRepoSearch] = useState('')
  const [userInput, setUserInput] = useState('OK')
  const [inputFieldValue, setInputFieldValue] = useState('')
  const [repoValue, setRepoValue] = useState('')
  const [inputStyle, setInputStyle] = useState('input-ok')

  useEffect(() => {
    if (userOrOrgToggle === false) {
      //remove qualifier when untoggled
      let id = 'no filter'
      let userRegex = /user:([\w])+/        
      let orgRegex = /org:([\w])+/        
      let repoRegex = /repo:([\w])+\/[\w]+/ 
        
      //check if any of the qualifiers is used by searching the regex. if true, 
      //the others will result in blank.
      const findUser = qualifiers.filter(value => userRegex.exec(value))
      const findOrg = qualifiers.filter(value => orgRegex.exec(value))
      const findRepo = qualifiers.filter(value => repoRegex.exec(value))
      if (findUser.length > 0) {
        QualifierChecker(findUser, qualifiers, setQualifiers, id)
      } 
      if (findOrg.length > 0) {
        QualifierChecker(findOrg, qualifiers, setQualifiers, id)
      }
      if (findRepo.length > 0) {
        QualifierChecker(findRepo, qualifiers, setQualifiers, id)
      }
    }
    // eslint-disable-next-line
      },[userOrOrgToggle]) 
  
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
  const inputFieldContent = (event) => {
    if (userRef.value) {
      setUserSearch(`user:${userRef.value}`)
    }
    if (orgRef.value) {
      setOrgSearch(`org:${orgRef.value}`)
    }
    setInputFieldValue(event.target.value)
  }

  const repoFieldContent = (event) => {
    if (repositoryRef.value) {
      setRepoSearch(`repo:${userRef.value}/${repositoryRef.value}`)
    }
    setRepoValue(event.target.value)
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

    //change style of input fields are submitting
    if (userInput === 'OK' && 
    //only reset when not empty. otherwise it will change every time due to 
    //useEffect()
    (userSearch !== '' || orgSearch !== '' || repoSearch !== '')) {
      setInputStyle('input-reset')
      setUserInput('RESET') 
    }

    if(userInput === 'RESET') {
      setInputStyle('input-ok')
      setUserInput('OK')
      setInputFieldValue('')
      setRepoValue('')
      setUserSearch('')
      setOrgSearch('')
      setRepoSearch('')
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

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
  
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
  
    switch(inputField) {
    case 'user:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          placeholder='Enter Username' 
          ref={(element) => userRef = element}
          onChange={inputFieldContent}
          value={inputFieldValue}
        /><button  className='button OK-button'>{userInput}
        </button>
        </form>
      </span>
    case 'org:ORGANIZATION': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          placeholder='Enter Organization'
          ref={(element) => orgRef = element}
          onChange={inputFieldContent}
          value={inputFieldValue}
        /><button className='button OK-button'>{userInput}
        </button>
        </form>
      </span>
    case 'repo:USERNAME/REPOSITORY': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className={`input-field ${inputStyle}`}
            placeholder='Enter Username' 
            ref={(element) => userRef = element}
            onChange={inputFieldContent}
            value={inputFieldValue}
          />        
          <input 
            className={`input-field ${inputStyle}`}
            id='repo-input'
            placeholder='Enter Repository' 
            ref={(element) => repositoryRef = element}
            onChange={repoFieldContent}
            value={repoValue}
          />
          <button className='button OK-button'>{userInput}
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
  inputStyle:PropTypes.object,
  setInputStyle:PropTypes.func,
  inputOK:PropTypes.object,
  inputReset:PropTypes.object,
  setMyIssues:PropTypes.func
}

export default UserOrOrganization