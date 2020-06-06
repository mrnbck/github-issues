import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'

const UserOrOrganization = ({ qualifiers, setQualifiers }) => {

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
  const userOrOrganization = () => {

    const userOrOrganization = 
      document.getElementById('userOrOrganization').options

    const id = 
      userOrOrganization[userOrOrganization.selectedIndex].value

    console.log('id', id)

    //remember whether USERNAME, ORGANIZATION or REPO
    setInputField(id)    
  }

  //track value in input field and save it in the correct state 
  const userOrOrgValue = () => {
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
    console.log('inputField',inputField)

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

    if (userInput === 'OK' && 
    //only reset when not empty. otherwise it will change every time due to 
    //useEffect()
    (userSearch !== '' || orgSearch !== '' || repoSearch !== '')
    ) {
      if (inputField !== 'in:everywhere') {
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
    let  userRegex = /user:([\w])+/        
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
    console.log('findEntry',findEntry)
    const helper = findEntry[0]
    let newQualifiers = []
    console.log('qualifiers',qualifiers)
    console.log('helper', helper)      
    if (helper) {
      console.log('qualifiers:',qualifiers[0], 'regex:', helper)
  
      if (qualifiers.includes(helper)) {
      //if qualifiers is already used, get existing qualifiers up until
      //current qualifier
        newQualifiers = qualifiers.slice(0,qualifiers.indexOf(helper))
        console.log('up until helper', newQualifiers)
  
        //skip the next entry and get the rest of the array to create a new
        //without the qualifier
        newQualifiers = newQualifiers.concat(qualifiers
          .slice(qualifiers.indexOf(helper)+1, qualifiers.length+1))
  
        console.log('from helper til end', newQualifiers)
            
        //if the value is not 'everywhere' add it to the rest. that way a 
        //qualifier is removed when 'everyhwere' is used
        if (inputField !== 'in:everywhere' && id !== '') {
          newQualifiers.push(`+${id}`)
          console.log('after adding new qualifier', newQualifiers)
        }
        setQualifiers(newQualifiers)}
    } else {
      if (inputField !== 'in:everywhere' && id !== '') {
        setQualifiers(qualifiers.concat(`+${id}`))
      }
    }
  
    if(userInput === 'RESET') {
      if (inputField !== 'in:everywhere') {
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
  const userOrOrgInput = () => {
  
    switch(inputField) {
    case 'user:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='user-org-input'
          id='user-input'
          placeholder='Enter Username' 
          ref={(element) => userRef = element}
          onChange={userOrOrgValue}
        /><button id='user-input-button' className='OK-button'>{userInput}
        </button>
        </form>
      </span>
    case 'org:ORGANIZATION': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className='user-org-input'
          id='user-input'
          placeholder='Enter Organization'
          ref={(element) => orgRef = element}
          onChange={userOrOrgValue}
        /><button id='user-input-button' className='OK-button'>{userInput}
        </button>
        </form>
      </span>
    case 'repo:USERNAME/REPOSITORY': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className='user-org-input'
            id='user-input'
            placeholder='Enter Username' 
            ref={(element) => userRef = element}
            onChange={userOrOrgValue}
          />        
          <input 
            className='user-org-input'
            id='repo-input'
            placeholder='Enter Repository' 
            ref={(element) => repositoryRef = element}
            onChange={userOrOrgValue}
          />
          <button id='user-input-button' className='OK-button'>{userInput}
          </button>
        </form>
      </span>
    default: 
      return <span></span>
    }

  }

  return (
    <div className="form-field">
      <label className="input-label">
          Search within a user&apos;s or organization&apos;s repositories?
      </label>
      <span >
        <select 
          id='userOrOrganization'
          className="picklist" 
          defaultValue='Everywhere'
          onChange={userOrOrganization}>
          <option value='in:everywhere'>Everywhere</option>
          <option value='user:USERNAME'>Username</option>
          <option value='org:ORGANIZATION'>Organization</option>
          <option value='repo:USERNAME/REPOSITORY'>Username/Repository
          </option>            
        </select>
      </span>
      {userOrOrgInput()}
    </div>
  )

}

UserOrOrganization.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func  
}

export default UserOrOrganization