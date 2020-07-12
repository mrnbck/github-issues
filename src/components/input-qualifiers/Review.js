import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import QualifierChecker from '../QualifierChecker'

const Review = ({ 
  qualifiers, 
  setQualifiers,
  reviewToggle,
  setMyIssues }) => {

  const [inputField, setInputField] = useState('')
  const [reviewedBy, setReviewedBy] = useState('')
  const [reviewRequested, setReviewRequested] = useState('')
  const [teamReview, setTeamReview] = useState('')
  const [inputOnOff, setInputOnOff] = useState('OK')
  const [inputStyle, setInputStyle] = useState('input-ok')

  useEffect(() => {
    if (reviewToggle === false) {
      //remove qualifier when untoggled
      let id = 'no filter'
      let reviewedByRegex = /reviewed-by:([\w])+/        
      let reviewRequestedRegex = /review-requested:([\w])+/        
      let teamReviewRegex = /team-review-requested:([\w])+/
      let reviewRegex = /review:([\w])+/ 
        
      const findReviewedBy = qualifiers.filter(value => 
        reviewedByRegex.exec(value))
      const findReviewRequested = qualifiers.filter(value => 
        reviewRequestedRegex.exec(value))
      const findTeamReview = qualifiers.filter(value => 
        teamReviewRegex.exec(value))
      const findReview = qualifiers.filter(value => 
        reviewRegex.exec(value))

      //check if any of the qualifiers is used by searching the regex. if true, 
      //the others will result in blank.
      if (findReviewedBy.length > 0) {
        QualifierChecker(
          findReviewedBy, qualifiers, setQualifiers, id, setMyIssues)
      } 
      if (findReviewRequested.length > 0) {
        QualifierChecker(
          findReviewRequested, qualifiers, setQualifiers, id, setMyIssues)
      }
      if (findTeamReview.length > 0) {
        QualifierChecker(
          findTeamReview, qualifiers, setQualifiers, id, setMyIssues)
      }
      if (findReview.length > 0) {
        QualifierChecker(
          findReview, qualifiers, setQualifiers, id, setMyIssues)
      }
    }
    // eslint-disable-next-line
      },[reviewToggle]) 

  //reset input fields when changing the field
  useEffect(() => {
    handleInputFields()
    // eslint-disable-next-line
  },[inputField])


  //use createRef to remember value from input fields
  let reviewedByRef = createRef()
  let reviewRequestedRef = createRef()
  let teamReviewRef = createRef()

  //check which select option was chosen and save it in a state
  const selectFieldPicker = () => {

    const option = document.getElementById('review').options

    const id = option[option.selectedIndex].value

    console.log('id', id)

    setInputField(id)    
  }

  //track value in input field and save it in the correct state 
  const inputFieldValue = () => {
    if (reviewedByRef.value) {
      setReviewedBy(`reviewed-by:${reviewedByRef.value}`)
    }
    if (reviewRequestedRef.value) {
      setReviewRequested(`review-requested:${reviewRequestedRef.value}`)
    }
    if (teamReviewRef.value) {
      setTeamReview(`team-review-requested:${teamReviewRef.value}`)
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
    if (teamReview) {
      id = teamReview
    }
    if (reviewRequested) {
      id = reviewRequested
    }  
    if (reviewedBy) {
      id = reviewedBy
    }
    if (inputField === 'review:none') {
      id = 'review:none'
    }
    if (inputField === 'review:required') {
      id = 'review:required'
    }
    if (inputField === 'review:approved') {
      id = 'review:approved'
    }
    if (inputField === 'review:changes_requested') {
      id = 'review:changes_requested'
    }
    if (inputField === 'no filter') {
      id = 'no filter'
    }

    if (inputOnOff === 'OK' && 
    //only reset when not empty. otherwise it will change every time due to 
    //useEffect()
    (reviewedBy !== '' || reviewRequested !== '' || teamReview !== '')
    ) {
      if (
        inputField !== 'no filter' && 
        inputField !== 'review:none' && 
        inputField !== 'review:required' &&
        inputField !== 'review:approved'
      ) {
        setInputStyle('input-reset')
        setInputOnOff('RESET') 
      }
    }

    if(inputOnOff === 'RESET') {
      if (inputField !== 'no filter') {
        setInputStyle('input-ok')
      }
      setInputOnOff('OK')
      setReviewedBy('')
      setReviewRequested('')
      setTeamReview('')
    }

    //create regex based on value in "id"
    let reviewedByRegex = /reviewed-by:([\w])+/        
    let reviewRequestedRegex = /review-requested:([\w])+/        
    let teamReviewRegex = /team-review-requested:([\w])+/
    let reviewRegex = /review:([\w])+/ 

    //search in qualifiers if current qualifier already exists
    //check all 3 regex since the key is different every time
    const findEntry = qualifiers.filter(value => {
      if (reviewedByRegex.exec(value)) {
        return (reviewedByRegex.exec(value))
      }
      if (reviewRequestedRegex.exec(value)) {
        return (reviewRequestedRegex.exec(value))
      }
      if (teamReviewRegex.exec(value)) {
        return (teamReviewRegex.exec(value))
      }
      if (reviewRegex.exec(value)) {
        return (reviewRegex.exec(value))
      }
      return null
    })

    QualifierChecker(findEntry, qualifiers, setQualifiers, id, setMyIssues)
      
  }

  //based on value in select show the correct input fields
  const generateInputField = () => {
  
    switch(inputField) {
    case 'reviewed-by:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          id='input-field'
          placeholder='Enter Username' 
          ref={(element) => reviewedByRef = element}
          onChange={inputFieldValue}
        /><button className='button OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'review-requested:USERNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}><input 
          className={`input-field ${inputStyle}`}
          id='input-field'
          placeholder='Enter Username'
          ref={(element) => reviewRequestedRef = element}
          onChange={inputFieldValue}
        /><button className='button OK-button'>{inputOnOff}
        </button>
        </form>
      </span>
    case 'team-review-requested:TEAMNAME': 
      return <span>
        <form className='searchbar' onSubmit={handleSubmit}>
          <input 
            className={`input-field ${inputStyle}`}
            id='input-field'
            placeholder='Enter Teamname' 
            ref={(element) => reviewedByRef = element}
            onChange={inputFieldValue}
          />        
          <button className='button OK-button'>{inputOnOff}
          </button>
        </form>
      </span>
    default: 
      return <span></span>
    }

  }

  if (reviewToggle === false) {
    return (<div></div>)
  } else

    return (
      <div className="form-field">
        <label className="input-label">
          Review Status and Reviewer
        </label>
        <span >
          <select 
            id='review'
            className="picklist" 
            defaultValue='Everywhere'
            onChange={selectFieldPicker}>
            <option value='no filter'>All</option>
            <option value='review:none'>Not Reviewed</option>
            <option value='review:required'>Review Required</option>
            <option value='review:approved'>Review Approved</option>
            <option value='review:changes_requested'>Changes Requested</option>
            <option value='reviewed-by:USERNAME'>Reviewed By </option>
            <option value='review-requested:USERNAME'>Review Requested By
            </option> 
            <option value='team-review-requested:TEAMNAME'>
            Review Requested By Team
            </option>

          </select>
        </span>
        {generateInputField()}
      </div>
    )

}

Review.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
}

export default Review