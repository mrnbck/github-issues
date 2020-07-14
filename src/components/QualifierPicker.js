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
  //publicOrPrivateToggle,
  //setPublicOrPrivateToggle,
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
  setMetadataToggle,
  labelToggle,
  setLabelToggle,
  whenCreatedToggle,
  setWhenCreatedToggle,
  whenUpdatedToggle,
  setWhenUpdatedToggle,
  whenClosedToggle,
  setWhenClosedToggle,
  whenMergedToggle,
  setWhenMergedToggle,
  setOpen
}) => {

  const [visible, setVisible] = useState('hidden')

  const pickerOpen = {
    width: '500px',
    height: '500px',
    fontSize: '14px',
    visibility: 'visible'
  }

  const pickerClosed = {
    width: '0px',
    height: '0px',
    fontSize: '0px',
    visibility: 'hidden'
  }

  const [pickerStyle, setPickerStyle] = useState(pickerClosed)
  
  const showPicker = () => {
    setPickerStyle(pickerOpen)
    document.getElementById('qualifier-container').style.opacity = '80%'
    document.getElementById('qualifier-container').style.visibility = 'visible'
    document.body.style.overflowY = 'hidden'
    setVisible('visible')
  }

  const hidePicker = () => {
    setPickerStyle(pickerClosed)
    document.getElementById('qualifier-container').style.visibility = 'hidden'
    document.getElementById('qualifier-container').style.opacity = '0'
    document.body.style.overflowY = 'auto'
    setVisible('hidden')
  }

  const closeExtendedSearch = () => {
    document.getElementById('open-extended').style.maxHeight = '0'
    document.getElementById('open-extended').style.transition = '0.2s'
    document.getElementById('extended-search-content').style.top = '-2000px'
    document.getElementById('extended-search-content')
      .style.transition = '0.5s'
    document.getElementById('open-extended-icon').style.rotate = '0deg'
    setOpen(false)
  }

  const toggler = (toggle, setToggle) => {
    if (toggle === false) {
      setToggle(true)
    } else setToggle(false)
  }
  
  const [filter, setFilter] = useState('')

  const filterQualifiers = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const hovercard = (quickinfo) => {
    return (
      <div className='hovercard'>
        <div>{quickinfo} 
        </div>
      </div>
    )
  }

  const qualifierList = () => {
    if (visible === 'visible') {
      return (
        <div>
          <div className='picker-top-bar'>
            <h3 className='qualifier-list-header'>ADD / REMOVE QUALIFIERS</h3>
            <input 
              className='picker-search' 
              placeholder='SEARCH'
              defaultValue={filter}
              onChange={filterQualifiers}></input>
          </div>
          {/* I have to filter and map the list in one step. when I save it
              in a state I get the error "switch from controlled to uncontrolled
              input component
              https://reactjs.org/docs/forms.html
              first filter for qualifier names that include the filter. then go
              through the resulting list and apply toggler*/}
          <span>{JSON_List.qualifiers.filter(qualifier => {
            if (qualifier.name.toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())) {
              return qualifier
            } return null
          }).map(qualifier => {
            return (
              <span 
                className="On-Off-Button" 
                key={JSON_List.qualifiers.indexOf(qualifier)}>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    onChange={() => {
                      toggler(
                        qualifier['toggle'], 
                        qualifier['setToggle']
                      )
                    }} 
                    checked={qualifier.toggle}/>
                  <span className="slider round"></span>
                </label>
                <div className='qualifier-name'>
                  <div className='qualifier-list'>{qualifier.name}</div>        
                  <div className='quickinfo'>?
                    <span className='tooltiptext'>
                      {hovercard(qualifier.quickinfo)}
                    </span>
                  </div>
                </div>
              </span> 
            )})}</span>
        </div>
      )
    }
  }

  const JSON_List = {
    "qualifiers": [
      { "name": "Search by Archived/Unarchived",
        "toggle": archiveToggle,
        "setToggle": setArchiveToggle,
        "quickinfo": "The archived qualifier filters your results based on "+
        "whether an issue or pull request is in an archived repository." },
      { "name": "Search by Assignee",
        "toggle": assigneeToggle,
        "setToggle": setAssigneeToggle,
        "quickinfo": "The assignee qualifier finds issues and pull requests "+
        "that are assigned to a certain user. You cannot search for issues and"+
        " pull requests that have any assignee, however, you can search for "+
        " issues and pull requests that have no assignee using the \"Missing"+
        " Metadata\" qualifier."  },
      { "name": "Search by Author",
        "toggle": authorToggle,
        "setToggle": setAuthorToggle,
        "quickinfo": "The author qualifier finds issues and pull requests "+
        "created by a certain user or integration account." },
      { "name": "Search by Branch",
        "toggle": branchToggle,
        "setToggle": setBranchToggle,
        "quickinfo": "You can filter pull requests based on the branch they "+
        "came from (the \"head\" branch) or the branch they are merging into"+
        " (the \"base\" branch)." },
      { "name": "Search by Commenter",
        "toggle": commenterToggle,
        "setToggle": setCommenterToggle,
        "quickinfo": "The commenter qualifier finds issues that contain a "+
        "comment from a certain user." },
      { "name": "Search by Commit Status",
        "toggle": commitStatusToggle,
        "setToggle": setCommitStatusToggle,
        "quickinfo": "You can filter pull requests based on the status of the "+
        "commits." },
      { "name": "Search by Draft Pull Requests",
        "toggle": draftToggle,
        "setToggle": setDraftToggle,
        "quickinfo": "You can filter for draft pull requests." },
      { "name": "Search by Involved User",
        "toggle": involvesToggle,
        "setToggle": setInvolvesToggle,
        "quickinfo": "You can use this qualifier to find issues and pull "+
        "requests that were either created by a certain user, assigned to "+
        "that user, mention that user, or were commented on by that user." },
      { "name": "Search by Issues or Pull Requests",
        "toggle": issueOrPrToggle,
        "setToggle": setIssueOrPrToggle,
        "quickinfo": "By default, GitHub search will return both issues and "+
        "pull requests. However, you can restrict search results to just"+
        "issues or pull requests using this toggle." },
      { "name": "Search by Labels",
        "toggle": labelToggle,
        "setToggle": setLabelToggle,
        "quickinfo": "You can narrow your results by labels, using the label "+
        "qualifier. If you select multiple labels, all labels must be present,"+
        " not any of them (AND not OR)."  },
      { "name": "Search by Language",
        "toggle": languageToggle,
        "setToggle": setLanguageToggle,
        "quickinfo": "With the language qualifier you can search for issues "+
        "and pull requests within repositories that are written in a certain"+
        " language." },
      { "name": "Search by Linked Issues or Pull Requests",
        "toggle": linkedToggle,
        "setToggle": setLinkedToggle,
        "quickinfo": "You can narrow your results to only include issues "+
        "that are linked to a pull request by a closing reference, or "+
        "pull requests that are linked to an issue that the pull request may "+
        "close." },
      { "name": "Search by Locked/Unlocked",
        "toggle": lockedToggle,
        "setToggle": setLockedToggle,
        "quickinfo": "You can search for an issue or pull request that has "+
        "a locked conversation" },
      { "name": "Search by Mention",
        "toggle": mentionToggle,
        "setToggle": setMentionToggle,
        "quickinfo": "The mentions qualifier finds issues that mention a "+
        "certain user" },
      { "name": "Search by Merged/Unmerged",
        "toggle": mergeToggle,
        "setToggle": setMergeToggle,
        "quickinfo":  "You can filter pull requests based on whether they're "+
        "merged or unmerged" },      
      { "name": "Search by Milestone",
        "toggle": milestoneToggle,
        "setToggle": setMilestoneToggle,
        "quickinfo": "The milestone qualifier finds issues or pull requests "+
        "that are a part of a milestone within a repository." },
      { "name": "Search by Missing Metadata",
        "toggle": metadataToggle,
        "setToggle": setMetadataToggle,
        "quickinfo": "You can narrow your search to issues and pull requests "+
        "that are missing certain metadata. That "+
        "metadata includes Labels, Milestones, Assignees and Projects" },
      /*{ "name": "Public or Private",
        "toggle": publicOrPrivateToggle,
        "setToggle": setPublicOrPrivateToggle
      },*/      
      { "name": "Search by Number of Comments",
        "toggle": numOfCommentsToggle,
        "setToggle": setNumOfCommentsToggle,
        "quickinfo": "You can use the comments qualifier along with greater "+
        "than, less than, and range qualifiers to search by the number of "+
        "comments." },
      { "name": "Search by Number of Interactions",
        "toggle": interactionsToggle,
        "setToggle": setInteractionsToggle,
        "quickinfo": "You can filter issues and pull requests by the number "+
        "of interactions with the interactions qualifier along with greater "+
        "than, less than, and range qualifiers. The interactions count is "+
        "the number of reactions and comments on an issue or pull request." },
      { "name": "Search by Number of Reactions",
        "toggle": reactionsToggle,
        "setToggle": setReactionsToggle,
        "quickinfo": "You can filter issues and pull requests by the number "+
        "of reactions using the reactions qualifier along with greater than,"+
        " less than, and range qualifiers." },
      { "name": "Search by Open or Closed",
        "toggle": openOrClosedToggle,
        "setToggle": setOpenOrClosedToggle,
        "quickinfo": "You can filter issues and pull requests based on "+
        "whether they're open or closed" },
      { "name": "Search by Project Board",
        "toggle": projectBoardToggle,
        "setToggle": setProjectBoardToggle,
        "quickinfo": "You can use the project qualifier to find issues that "+
        "are associated with a specific project board in a repository or "+
        "organization. You must search project boards by the project board "+
        "number. You can find the project board number at the end of a "+
        "project board's URL." },
      { "name": "Search by Review Status and Reviewer",
        "toggle": reviewToggle,
        "setToggle": setReviewToggle,
        "quickinfo": "You can filter pull requests based on their review "+
        "status (none, required, approved, or changes requested), by "+
        "reviewer, and by requested reviewer." },
      { "name": "Search by Team Mention",
        "toggle": teamMentionToggle,
        "setToggle": setTeamMentionToggle,
        "quickinfo": "For organizations and teams you belong to, you can use"+
        " the team qualifier to find issues or pull requests that @mention a "+
        "certain team within that organization. " },
      { "name": "Search by Title, Body or Comment",
        "toggle": titleBodyCommentToggle,
        "setToggle": setTitleBodyCommentToggle,
        "quickinfo": "With this qualifier you can restrict your search to "+
        "the title, body, comments, or any combination of these. When you omit"+
        " this qualifier, the title, body, and comments are all searched." },
      { "name": "Search by User, Organization or Repository",
        "toggle": userOrOrgToggle,
        "setToggle": setUserOrOrgToggle,
        "quickinfo": "Use this qualifier to search issues and pull requests in"+
        " all repositories owned by a certain user or organization, or seach "+
        "in a specific respository" },
      { "name": "Search by When Created",
        "toggle": whenCreatedToggle,
        "setToggle": setWhenCreatedToggle,
        "quickinfo": "You can filter issues based on times of creation" },
      { "name": "Search by When Closed",
        "toggle": whenClosedToggle,
        "setToggle": setWhenClosedToggle,
        "quickinfo": "You can filter issues and pull requests based on when"+
        " they were closed." },
      { "name": "Search by When Merged",
        "toggle": whenMergedToggle,
        "setToggle": setWhenMergedToggle,
        "quickinfo": "You can filter pull requests based on when they were "+
        "merged."
      },      
      { "name": "Search by When Updated",
        "toggle": whenUpdatedToggle,
        "setToggle": setWhenUpdatedToggle,
        "quickinfo": "You can filter issues based on when they were last "+
      "updated." },
    ]
  }

  return (
    <div>
      <div className='extended-search-buttons'>
        <div className='button plus-button' onClick={showPicker}>+</div>
        <button 
          className='button close-button' 
          onClick={closeExtendedSearch}>Close
        </button>
      </div>
      <div id='qualifier-container' onClick={hidePicker}></div>
      <div id='qualifier-picker' style={pickerStyle}>
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
  setMetadataToggle:PropTypes.func,
  setOpen:PropTypes.func,
  labelToggle:PropTypes.bool,
  setLabelToggle:PropTypes.func,
  whenCreatedToggle:PropTypes.bool,
  setWhenCreatedToggle:PropTypes.func,
  whenUpdatedToggle:PropTypes.bool,
  setWhenUpdatedToggle:PropTypes.func,
  whenClosedToggle:PropTypes.bool,
  setWhenClosedToggle:PropTypes.func,
  whenMergedToggle:PropTypes.bool,
  setWhenMergedToggle:PropTypes.func
}

export default QualifierPicker