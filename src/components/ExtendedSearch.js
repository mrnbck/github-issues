import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import TitleBodyComment from './TitleBodyComment'
import UserOrOrganization from './UserOrOrganization'
import IssueOrPr from './IssueOrPr'

const ExtendedSearch = ({ 
  qualifiers, setQualifiers,
  baseUrl,filter, currentPage, setUrl }) => {

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

  const qualifierPicker = () => {
    document.getElementById('qualifier-picker').style.width = '60%'
    document.getElementById('qualifier-picker').style.height = '60%'
    document.getElementById('qualifier-container').style.opacity = '80%'
    document.getElementById('qualifier-picker').style.fontSize = '16px'
    document.getElementById('qualifier-picker').style.visibility = 'visible'
    document.getElementById('qualifier-container').style.visibility = 'visible'
  }

  const hidePicker = () => {
    document.getElementById('qualifier-picker').style.visibility = 'hidden'
    document.getElementById('qualifier-container').style.visibility = 'hidden'
    document.getElementById('qualifier-picker').style.width = '0'
    document.getElementById('qualifier-picker').style.height = '0'
    document.getElementById('qualifier-picker').style.fontSize = '0'
    document.getElementById('qualifier-container').style.opacity = '0'
    
  }

  return (
    <div>
      <IssueOrPr qualifiers={qualifiers} setQualifiers={setQualifiers} />
     
      <TitleBodyComment qualifiers={qualifiers} setQualifiers={setQualifiers}/>

      <UserOrOrganization 
        qualifiers={qualifiers} 
        setQualifiers={setQualifiers}
      />

      <div className='plus-button' onClick={qualifierPicker}>+</div>
      <div id='qualifier-container' onClick={hidePicker}></div>
      <div id='qualifier-picker'>this will contain a list of search qualifiers
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