import React from 'react'

const Login = () => {
  
  const url = window.location + ''
  const code = url.match(/code=([^&]+)/)[1]
  const state = url.match(/state=([^&]+)/)[1]

  const getToken = async (code) => {

    const response = await 
    fetch(`http://localhost:3001/oauth-token/${code}/${state}`, {
      credentials: 'include'
    })
      
    const text = await response

    console.log('response.text()',text)
  }

  getToken(code)


  return (
    <>
      <div>{console.log('logging in')}</div>
    </>
  )
}

export default Login