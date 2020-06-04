import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'

const ExtendedSearch = ({ 
  qualifiers, setQualifiers,
  baseUrl,filter, currentPage, setUrl }) => {

  const [inputField, setInputField] = useState('')
  const [userSearch, setUserSearch] = useState('')
  const [orgSearch, setOrgSearch] = useState('')
  const [repoSearch, setRepoSearch] = useState('')
  const [userInput, setUserInput] = useState('OK')

  //use createRef to remember value from input fields
  let userRef = createRef()
  let orgRef = createRef()
  let repositoryRef = createRef()

  //reload every time qualifiers change
  useEffect(() => {
    if (qualifiers.length > 0) {
      setUrl(baseUrl+filter+qualifiers.join('')+'&page='+currentPage)
    } 
    else {
      setUrl(baseUrl+filter+'&page='+currentPage)
    }
    // eslint-disable-next-line
  },[qualifiers])

  //reset input fields when changing the field
  useEffect(() => {
    if(inputField && inputField !== 'in:everywhere') {
      document.getElementById('user-input').style.pointerEvents = 'auto'
      document.getElementById('user-input').style.backgroundColor = 'white'
      document.getElementById('user-input').style.color = 'black'
      document.getElementById('user-input').style.textTransform = 'capitalize'
      document.getElementById('user-input').value = ''

      if(document.getElementById('repo-input')) {
        document.getElementById('repo-input').style.pointerEvents = 'auto'
        document.getElementById('repo-input').style.backgroundColor = 'white'
        document.getElementById('repo-input').style.color = 'black'
        document.getElementById('repo-input').style.textTransform = 'capitalize'
      }
      setUserInput('OK')
    }

    //refactor to use separate function for this and in handleSubmit
    if (inputField === 'in:everywhere') {
      
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

          setQualifiers(newQualifiers)}
      }
    }
    setUserSearch('')
    setOrgSearch('')
    setRepoSearch('')
    // eslint-disable-next-line
  },[inputField])

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const issueOrPr = () => {

    const issueOrPr = document.getElementById('issueOrPr').options
    const id = issueOrPr[issueOrPr.selectedIndex].value
    
    let regex = /\+type:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))
    const helper = findEntry[0]
    
    let newQualifiers = []
    console.log('qualifiers',qualifiers)
    console.log('helper', helper)      
    if (helper) {
      console.log('qualifiers:',qualifiers[0], 'regex:', helper)
      if (qualifiers.includes(helper)) {
        newQualifiers = qualifiers.slice(0,qualifiers.indexOf(helper))

        console.log('up until helper', newQualifiers)

        newQualifiers = newQualifiers.concat(qualifiers
          .slice(qualifiers.indexOf(helper)+1, qualifiers.length+1))

        console.log('from helper til end', newQualifiers)

        if (id !== 'type:both') {
          newQualifiers.push(`+${id}`)}

        console.log('after adding new qualifier', newQualifiers)

        setQualifiers(newQualifiers)}
    } else if (id !== 'type:both') {
      setQualifiers(qualifiers.concat(`+${id}`))}
            

  }

  //check if there's already a version of this qualifier in the query. if not, 
  //replace it with the new one.  
  const titleBodyComment = () => {    
    
    const titleBodyComment = document.getElementById('titleBodyComment').options
    const id = 
      titleBodyComment[titleBodyComment.selectedIndex].value

    console.log(id)

    let  regex = /\+in:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))
    console.log(findEntry)
    const helper = findEntry[0]
    let newQualifiers = []
    console.log('qualifiers',qualifiers)
    console.log('helper', helper)      
    if (helper) {
      console.log('qualifiers:',qualifiers[0], 'regex:', helper)

      if (qualifiers.includes(helper)) {
        newQualifiers = qualifiers.slice(0,qualifiers.indexOf(helper))
        console.log('up until helper', newQualifiers)

        newQualifiers = newQualifiers.concat(qualifiers
          .slice(qualifiers.indexOf(helper)+1, qualifiers.length+1))

        console.log('from helper til end', newQualifiers)

        if (id !== 'in:everywhere') {
          newQualifiers.push(`+${id}`)}
        console.log('after adding new qualifier', newQualifiers)
        setQualifiers(newQualifiers)}
    } else
    if (id !== 'in:everywhere') {
      setQualifiers(qualifiers.concat(`+${id}`))
    }
          
  }

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

    //check if there is an input field or if the option is "everywhere"
    console.log('inputField',inputField)
    if(inputField) {
      if (userInput === 'OK') {  
        document.getElementById('user-input').style.pointerEvents = 'none'
        document.getElementById('user-input').style.backgroundColor = '#fdfdfd'
        document.getElementById('user-input').style.color = '#a6a6a6'
        document.getElementById('user-input').style.textTransform = 'uppercase'
        if(document.getElementById('repo-input')) {
          document.getElementById('repo-input').style.pointerEvents = 'none'
          document.getElementById('repo-input').style.backgroundColor='#fdfdfd'
          document.getElementById('repo-input').style.color = '#a6a6a6'
          document.getElementById('repo-input').style.textTransform='uppercase'
        }
        setUserInput('RESET') 

        //create regex based in value in "id"
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
            newQualifiers.push(`+${id}`)
            console.log('after adding new qualifier', newQualifiers)
            setQualifiers(newQualifiers)}
        } else setQualifiers(qualifiers.concat(`+${id}`))
        

      }
      if(userInput === 'RESET') {

        document.getElementById('user-input').style.pointerEvents = 'auto'
        document.getElementById('user-input').style.backgroundColor = 'white'
        document.getElementById('user-input').style.color = 'black'
        document.getElementById('user-input').style.textTransform = 'capitalize'
        document.getElementById('user-input').value = ''
        if(document.getElementById('repo-input')) {
          document.getElementById('repo-input').style.pointerEvents = 'auto'
          document.getElementById('repo-input').style.backgroundColor = 'white'
          document.getElementById('repo-input').style.color = 'black'
          document.getElementById('repo-input').style.textTransform='capitalize'
          document.getElementById('repo-input').value = ''
        }
        setUserInput('OK')
        setUserSearch('')
        setOrgSearch('')
        setRepoSearch('')
      }
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
    <div>
      <div className="form-field">
        <h2>What would you like to search?</h2>
        <label className="input-label">Issues or Pull Requests?</label>
        <span >
          <select id='issueOrPr' className="picklist" defaultValue='Both' 
            onChange={issueOrPr}>
            <option value='type:both'>Both</option>
            <option value='type:issues'>Issues</option>
            <option value='type:pr'>Pull Requests</option>
          </select>
        </span>
      </div>
     
      <div className="form-field">
        <label className="input-label">Search by title, body or comments?
        </label>
        <span >
          <select 
            id='titleBodyComment' 
            className="picklist" 
            defaultValue='Everywhere' 
            onChange={titleBodyComment}>
            <option value='in:everywhere'>Everywhere</option>
            <option value='in:title'>Title</option>
            <option value='in:body'>Body</option>
            <option value='in:comments'>Comments</option>            
          </select>
        </span>
        

      </div>

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
    </div>
   
  )

}

ExtendedSearch.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
  baseUrl: PropTypes.string,
  filter: PropTypes.string,
  currentPage: PropTypes.string,
  setUrl: PropTypes.func
}

export default ExtendedSearch