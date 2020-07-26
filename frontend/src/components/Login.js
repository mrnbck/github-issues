import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Login = ({ setLoggedIn }) => {
  
  useEffect(() => {
    setLoggedIn(true)
  })
  
  const url = window.location + ''
  const code = url.match(/code=([^&]+)/)[1]
  const state = url.match(/state=([^&]+)/)[1]

  const getToken = async (code) => {

    try {
      await fetch(`/api/oauth-token/${code}/${state}`, {
        credentials: 'include'
      })      
    } catch (error) {
      console.log(error)
    }
  }
  getToken(code)
  return (
    <>
      <div>Logging in</div>
    </>
  )
}

Login.propTypes = {
  setLoggedIn:PropTypes.func
}

export default Login