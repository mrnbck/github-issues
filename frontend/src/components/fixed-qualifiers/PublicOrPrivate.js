import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'
import { 
  BrowserRouter as Router, Link } from 'react-router-dom'


const PublicOrPrivate = ({ 
  qualifiers, 
  setQualifiers, 
  publicOrPrivateToggle,
}) => {

  const [inputField, setInputField] = useState('')

  useEffect(() => {
    if (publicOrPrivateToggle === false) {
        
      //remove qualifier when untoggled
      let id = 'no filter'
      let regex = /is:([\w])+/
      const findEntry = qualifiers.filter(value => regex.exec(value))
      if (findEntry.length > 0) {
        QualifierChecker(findEntry, qualifiers, setQualifiers, id)
      }
    }
    // eslint-disable-next-line
      },[publicOrPrivateToggle])
    
  const selectFieldPicker = () => {

    const option = document.getElementById('publicOrPrivate').options
    const id = option[option.selectedIndex].value
    
    let regex = /is:([\w])+/

    const findEntry = qualifiers.filter(value => regex.exec(value))

    QualifierChecker(findEntry, qualifiers, setQualifiers, id)

    setInputField(id)
  }

  const loginButton = {
    marginLeft: '20px'
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await fetch('http://localhost:3001/login')
    const url = await response.text()

    /*window.open(url,
      'Github Login',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=700,'+
      'height=726'
    )*/
    window.location.assign(url)
  }

  const generateInputField = () => {
    switch(inputField) {
    case 'is:private':
      return <span>
        <span>
        To search for issues from private respositories, 
        please login to Github first.
        </span>
        <Router>
          <Link to='/login'>        
            <button 
              style={loginButton} 
              className='close-button' 
              onClick={handleLogin}>Login</button></Link>
        </Router>

      </span>
    default: 
      return <span>
        <span>
      To search for issues from private respositories, 
      please login to Github first.
        </span>
        <Router>
          <Link to='/login'>        
            <button 
              style={loginButton} 
              className='close-button' 
              onClick={handleLogin}>Login</button></Link>
        </Router>
      </span>
    }
  }


  if (publicOrPrivateToggle === false) {
    
    return (
      <div></div>)
  }  else 
  
    return (
      <div className="form-field">        
        <label className="input-label">Public Or Private</label>
        <span >
          <select id='publicOrPrivate' className="picklist" defaultValue='Both' 
            onChange={selectFieldPicker}>
            <option value='no filter'>Both</option>
            <option value='is:public'>Public</option>
            <option value='is:private'>Private</option>
          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

PublicOrPrivate.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
  setLogin:PropTypes.func,

}

export default PublicOrPrivate