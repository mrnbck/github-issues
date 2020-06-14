/* eslint-disable quotes */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const QualifierPicker = ({
  issueOrPrToggle,
  setIssueOrPrToggle,
  titleBodyCommentToggle, 
  setTitleBodyCommentToggle,
  userOrOrgToggle,
  setUserOrOrgToggle,
  openOrClosedToggle,
  setOpenOrClosedToggle,
  publicOrPrivateToggle,
  setPublicOrPrivateToggle,
  authorToggle,
  setAuthorToggle,
  assigneeToggle,
  setAssigneeToggle,
  mentionToggle,
  setMentionToggle,
  teamMentionToggle,
  setTeamMentionToggle,
  commenterToggle,
  setCommenterToggle,
  involvesToggle,
  setInvolvesToggle,
  linkedToggle,
  setLinkedToggle,
  milestoneToggle,
  setMilestoneToggle,
  projectBoardToggle,
  setProjectBoardToggle,
  commitStatusToggle,
  setCommitStatusToggle,
  branchToggle,
  setBranchToggle,
  languageToggle,
  setLanguageToggle,
  numOfCommentsToggle,
  setNumOfCommentsToggle,
  interactionsToggle,
  setInteractionsToggle,
  reactionsToggle,
  setReactionsToggle,
  draftToggle,
  setDraftToggle,
  reviewToggle,
  setReviewToggle,
  mergeToggle,
  setMergeToggle,
  archiveToggle,
  setArchiveToggle,
  lockedToggle,
  setLockedToggle,
  metadataToggle,
  setMetadataToggle
}) => {

  const [visible, setVisible] = useState('hidden')

  const showPicker = () => {
    document.getElementById('qualifier-picker').style.width = '500px'
    document.getElementById('qualifier-picker').style.height = '500px'
    document.getElementById('qualifier-container').style.opacity = '80%'
    document.getElementById('qualifier-picker').style.fontSize = '14px'
    document.getElementById('qualifier-picker').style.visibility = 'visible'
    document.getElementById('qualifier-container').style.visibility = 'visible'
    document.body.style.overflow = 'hidden'
    setVisible('visible')
  }

  const hidePicker = () => {
    document.getElementById('qualifier-picker').style.visibility = 'hidden'
    document.getElementById('qualifier-container').style.visibility = 'hidden'
    document.getElementById('qualifier-picker').style.width = '0'
    document.getElementById('qualifier-picker').style.height = '0'
    document.getElementById('qualifier-picker').style.fontSize = '0'
    document.getElementById('qualifier-container').style.opacity = '0'
    document.body.style.overflowY = 'auto'
    setVisible('hidden')
  }

  const toggler = (toggle, setToggle) => {
    if (toggle === false) {
      setToggle(true)
    } else setToggle(false)
  }
  
  const JSON_List = {
    "qualifiers": [
      { "name": "Issues or Pull Requests",
        "toggle": issueOrPrToggle,
        "setToggle": setIssueOrPrToggle },
      { "name": "Title, Body or Comment",
        "toggle": titleBodyCommentToggle,
        "setToggle": setTitleBodyCommentToggle },
      { "name": "User, Organization or Repository",
        "toggle": userOrOrgToggle,
        "setToggle": setUserOrOrgToggle },
      { "name": "Open or Closed",
        "toggle": openOrClosedToggle,
        "setToggle": setOpenOrClosedToggle },
      { "name": "Public or Private",
        "toggle": publicOrPrivateToggle,
        "setToggle": setPublicOrPrivateToggle },
      { "name": "Search by Author",
        "toggle": authorToggle,
        "setToggle": setAuthorToggle },
      { "name": "Search by Assignee",
        "toggle": assigneeToggle,
        "setToggle": setAssigneeToggle },
      { "name": "Search by Mention",
        "toggle": mentionToggle,
        "setToggle": setMentionToggle },
      { "name": "Search by Team Mention",
        "toggle": teamMentionToggle,
        "setToggle": setTeamMentionToggle },
      { "name": "Search by Commenter",
        "toggle": commenterToggle,
        "setToggle": setCommenterToggle },
      { "name": "Search by Involved User",
        "toggle": involvesToggle,
        "setToggle": setInvolvesToggle },
      { "name": "Search by Linked Issues or Pull Requests",
        "toggle": linkedToggle,
        "setToggle": setLinkedToggle },
      { "name": "Search by Milestone",
        "toggle": milestoneToggle,
        "setToggle": setMilestoneToggle },
      { "name": "Search by Project Board",
        "toggle": projectBoardToggle,
        "setToggle": setProjectBoardToggle },
      { "name": "Search by Commit Status",
        "toggle": commitStatusToggle,
        "setToggle": setCommitStatusToggle },
      { "name": "Search by Branch",
        "toggle": branchToggle,
        "setToggle": setBranchToggle },
      { "name": "Search by Language",
        "toggle": languageToggle,
        "setToggle": setLanguageToggle },
      { "name": "Search by Number of Comments",
        "toggle": numOfCommentsToggle,
        "setToggle": setNumOfCommentsToggle },
      { "name": "Search by Number of Interactions",
        "toggle": interactionsToggle,
        "setToggle": setInteractionsToggle },
      { "name": "Search by Number of Reactions",
        "toggle": reactionsToggle,
        "setToggle": setReactionsToggle },
      { "name": "Search by Draft Pull Requests",
        "toggle": draftToggle,
        "setToggle": setDraftToggle },
      { "name": "Search by Review Status and Reviewer",
        "toggle": reviewToggle,
        "setToggle": setReviewToggle },
      { "name": "Search by Merged/Unmerged",
        "toggle": mergeToggle,
        "setToggle": setMergeToggle },
      { "name": "Search by Archived/Unarchived",
        "toggle": archiveToggle,
        "setToggle": setArchiveToggle },
      { "name": "Search by Locked/Unlocked",
        "toggle": lockedToggle,
        "setToggle": setLockedToggle },
      { "name": "Search by Missing Metadata",
        "toggle": metadataToggle,
        "setToggle": setMetadataToggle },
    ]
  }

  const qualifierList = () => {
    if (visible === 'visible') {
      return (
        <div>
          <h3 className='qualifier-list-header'>ADD / REMOVE QUALIFIERS</h3>
          <span>{JSON_List.qualifiers.map(qualifier => {
            return (
              <span 
                className="On-Off-Button" 
                key={JSON_List.qualifiers.indexOf(qualifier)}>
                <label className="switch">
                  <input type="checkbox" onChange={() => {
                    toggler(
                      qualifier['toggle'], 
                      qualifier['setToggle']
                    )
                  }} 
                  checked={qualifier.toggle}/>
                  <span className="slider round"></span>
                </label>
                <div className='qualifier-list'>{qualifier.name}</div>          
              </span> 
            )})}</span>
        </div>
      )
    }
  }

  return (
    <div>
      <div className='plus-button' onClick={showPicker}>+</div>
      <div id='qualifier-container' onClick={hidePicker}></div>
      <div id='qualifier-picker'>
        {qualifierList()}
      </div>
    </div>
  )
}

QualifierPicker.propTypes = {
  issueOrPrToggle: PropTypes.bool,
  setIssueOrPrToggle: PropTypes.func,
  titleBodyCommentToggle: PropTypes.bool,
  setTitleBodyCommentToggle: PropTypes.func,
  userOrOrgToggle: PropTypes.bool,
  setUserOrOrgToggle: PropTypes.func,
  openOrClosedToggle:PropTypes.bool,
  setOpenOrClosedToggle:PropTypes.func,
  publicOrPrivateToggle:PropTypes.bool,
  setPublicOrPrivateToggle:PropTypes.func,
  authorToggle: PropTypes.bool,
  setAuthorToggle: PropTypes.func,
  assigneeToggle:PropTypes.bool,
  setAssigneeToggle:PropTypes.func,
  mentionToggle:PropTypes.bool,
  setMentionToggle:PropTypes.func,
  teamMentionToggle:PropTypes.bool,
  setTeamMentionToggle:PropTypes.func,
  commenterToggle:PropTypes.bool,
  setCommenterToggle:PropTypes.func,
  involvesToggle: PropTypes.bool,
  setInvolvesToggle:PropTypes.func,
  linkedToggle:PropTypes.bool,
  setLinkedToggle:PropTypes.func,
  milestoneToggle:PropTypes.bool,
  setMilestoneToggle:PropTypes.func,
  projectBoardToggle:PropTypes.bool,
  setProjectBoardToggle:PropTypes.func,
  commitStatusToggle:PropTypes.bool,
  setCommitStatusToggle:PropTypes.func,
  branchToggle:PropTypes.bool,
  setBranchToggle:PropTypes.func,
  languageToggle:PropTypes.bool,
  setLanguageToggle:PropTypes.func,
  numOfCommentsToggle:PropTypes.bool,
  setNumOfCommentsToggle:PropTypes.func,
  interactionsToggle:PropTypes.bool,
  setInteractionsToggle:PropTypes.func,
  reactionsToggle:PropTypes.bool,
  setReactionsToggle:PropTypes.func,
  draftToggle:PropTypes.bool,
  setDraftToggle:PropTypes.func,
  reviewToggle:PropTypes.bool,
  setReviewToggle:PropTypes.func,
  mergeToggle:PropTypes.bool,
  setMergeToggle:PropTypes.func,
  archiveToggle:PropTypes.bool,
  setArchiveToggle:PropTypes.func,
  lockedToggle:PropTypes.bool,
  setLockedToggle:PropTypes.func,
  metadataToggle:PropTypes.bool,
  setMetadataToggle:PropTypes.func
}

export default QualifierPicker