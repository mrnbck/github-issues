import React from 'react'

const Login = () => {
  
  const url = window.location + ''
  const code = url.match(/code=([^&]+)/)[1]
  const state = url.match(/state=([^&]+)/)[1]

  const getToken = async (code) => {

    try {
      const response = await 
      fetch(`/api/oauth-token/${code}/${state}`, {
        credentials: 'include'
      })      
      console.log('response.text()',response)
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
export default Login