import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Archived from './fixed-qualifiers/Archived'
import Assignee from './input-qualifiers/Assignee'
import Author from './input-qualifiers/Author'
import BranchName from './input-qualifiers/BranchName'
import Commenter from './input-qualifiers/Commenter'
import CommitStatus from './fixed-qualifiers/CommitStatus'
import Draft from './fixed-qualifiers/Draft'
import Involved from './input-qualifiers/Involved'
import IssueOrPr from './fixed-qualifiers/IssueOrPr'
import Label from './input-qualifiers/Label'
import Language from './input-qualifiers/Language'
import Linked from './fixed-qualifiers/Linked'
import Locked from './fixed-qualifiers/Locked'
import Mention from './input-qualifiers/Mention'
import Merge from './fixed-qualifiers/Merged'
import Metadata from './fixed-qualifiers/Metadata'
import Milestone from './input-qualifiers/Milestone'
import NumberOfComments from './input-qualifiers/NumberOfComments'
import NumberOfInteractions from './input-qualifiers/NumberOfInteractions'
import NumberOfReactions from './input-qualifiers/NumberOfReactions'
import TitleBodyComment from './fixed-qualifiers/TitleBodyComment'
import UserOrOrganization from './input-qualifiers/UserOrOrganization'
import OpenOrClosed from './fixed-qualifiers/OpenOrClosed'
//import PublicOrPrivate from './fixed-qualifiers/PublicOrPrivate'
import ProjectBoard from './input-qualifiers/ProjectBoard'
import QualifierPicker from './QualifierPicker'
import Review from './input-qualifiers/Review'
import TeamMention from './input-qualifiers/TeamMention'
import WhenCreated from './input-qualifiers/WhenCreated'
import WhenUpdated from './input-qualifiers/WhenUpdated'
import WhenClosed from './input-qualifiers/WhenClosed'
import WhenMerged from './input-qualifiers/WhenMerged'

const ExtendedSearch = ({ 
  qualifiers, setQualifiers, setMyIssues,
  baseUrl,filter, currentPage, setUrl, setOpen }) => {

  const [archiveToggle, setArchiveToggle] = useState(false)
  const [authorToggle, setAuthorToggle] = useState(false)
  const [assigneeToggle, setAssigneeToggle] = useState(false)
  const [branchToggle, setBranchToggle] = useState(false)
  const [commenterToggle, setCommenterToggle] = useState(false)
  const [commitStatusToggle, setCommitStatusToggle] = useState(false)
  const [draftToggle, setDraftToggle] = useState(false)
  const [interactionsToggle, setInteractionsToggle] = useState(false)
  const [involvesToggle, setInvolvesToggle] = useState(false)
  const [issueOrPrToggle, setIssueOrPrToggle] = useState(true)
  const [labelToggle, setLabelToggle] = useState(false)
  const [languageToggle, setLanguageToggle] = useState(false)
  const [linkedToggle, setLinkedToggle] = useState(false)
  const [lockedToggle, setLockedToggle] = useState(false)
  const [metadataToggle, setMetadataToggle] = useState(false)
  const [mentionToggle, setMentionToggle] = useState(false)
  const [mergeToggle, setMergeToggle] = useState(false)
  const [milestoneToggle, setMilestoneToggle] = useState(false)
  const [numOfCommentsToggle, setNumOfCommentsToggle] = useState(false)
  const [openOrClosedToggle, setOpenOrClosedToggle] = useState(false)
  const [publicOrPrivateToggle, setPublicOrPrivateToggle] = useState(false)
  const [projectBoardToggle, setProjectBoardToggle] = useState(false)
  const [reactionsToggle, setReactionsToggle] = useState(false)
  const [reviewToggle, setReviewToggle] = useState(false)
  const [teamMentionToggle, setTeamMentionToggle] = useState(false)
  const [titleBodyCommentToggle, setTitleBodyCommentToggle] = useState(false)
  const [userOrOrgToggle, setUserOrOrgToggle] = useState(false)
  const [whenCreatedToggle, setWhenCreatedToggle] = useState(false)
  const [whenUpdatedToggle, setWhenUpdatedToggle] = useState(false)
  const [whenClosedToggle, setWhenClosedToggle] = useState(false)
  const [whenMergedToggle, setWhenMergedToggle] = useState(false)

  const inputOK = {
    pointerEvents: 'auto',
    backgroundColor: 'white',
    color: 'black',
    textTransform: 'capitalize'
  }
  
  const inputReset = {    
    pointerEvents: 'none',
    backgroundColor: '#fdfdfd',
    color: '#a6a6a6',
    textTransform: 'uppercase' 
  }

  const [inputStyle, setInputStyle] = useState(inputOK)

  //reload every time qualifiers change
  useEffect(() => {
    if (qualifiers.length > 0 && filter !== '') {
      setUrl(baseUrl+filter+'+'+qualifiers.join('')+'&page='+currentPage)
    }
    if (qualifiers.length > 0 && filter === '') {
      setUrl(baseUrl+filter+qualifiers.join('')+'&page='+currentPage)
    } 
    if (qualifiers.length === 0) {
      setUrl(baseUrl+filter+'&page='+currentPage)
    }
    // eslint-disable-next-line
  },[qualifiers])

  const styleWidth = {
    width: 'max-content'
  }

  return (
    <div style={styleWidth}>
      <h2>What would you like to search?</h2>
      <Archived
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        archiveToggle={archiveToggle}
        setMyIssues={setMyIssues}
      />
      <Assignee
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        assigneeToggle={assigneeToggle}
        inputStyle={inputStyle}
        setInputStyle={setInputStyle}
        inputOK={inputOK}
        inputReset={inputReset}
        setMyIssues={setMyIssues} 
      />

      <Author
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        authorToggle={authorToggle}
        setMyIssues={setMyIssues}
      />

      <BranchName
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        branchToggle={branchToggle}
        setMyIssues={setMyIssues}
      />

      <Commenter
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        commenterToggle={commenterToggle}
        setMyIssues={setMyIssues}
      />

      <CommitStatus
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        commitStatusToggle={commitStatusToggle}
        setMyIssues={setMyIssues}
      />

      <Draft
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        draftToggle={draftToggle}
        setMyIssues={setMyIssues}
      />
      
      <Involved
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        involvesToggle={involvesToggle}
        setMyIssues={setMyIssues}
      />
      
      <IssueOrPr 
        qualifiers={qualifiers} 
        setQualifiers={setQualifiers} 
        issueOrPrToggle={issueOrPrToggle}
        setMyIssues={setMyIssues}
      />

      <Language
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        languageToggle={languageToggle}
        setMyIssues={setMyIssues}
      />

      <Linked
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        linkedToggle={linkedToggle}
        setMyIssues={setMyIssues}
      />

      <Label
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        labelToggle={labelToggle}
        setMyIssues={setMyIssues} 
      />

      <Locked
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        lockedToggle={lockedToggle}
        setMyIssues={setMyIssues}
      />

      <Merge
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        mergeToggle={mergeToggle}
        setMyIssues={setMyIssues}
      />

      <Metadata
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        metadataToggle={metadataToggle}
        setMyIssues={setMyIssues}
      />
     
      <Mention
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        mentionToggle={mentionToggle}
        setMyIssues={setMyIssues}
      />

      <Milestone
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        milestoneToggle={milestoneToggle}
        setMyIssues={setMyIssues}
      />

      <NumberOfComments
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        numOfCommentsToggle={numOfCommentsToggle}
        setMyIssues={setMyIssues}
      />

      <NumberOfInteractions
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        interactionsToggle={interactionsToggle}
        setMyIssues={setMyIssues}
      />

      <NumberOfReactions
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        reactionsToggle={reactionsToggle}
        setMyIssues={setMyIssues}
      />

      <OpenOrClosed
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        openOrClosedToggle={openOrClosedToggle}
        setMyIssues={setMyIssues}
      />

      <ProjectBoard
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        projectBoardToggle={projectBoardToggle}
        setMyIssues={setMyIssues}
      />

      {/*dont use because API does not support search for private 
        <PublicOrPrivate
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        publicOrPrivateToggle={publicOrPrivateToggle}
      />*/}

      <Review
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        reviewToggle={reviewToggle}
        setMyIssues={setMyIssues}
      />

      <TeamMention
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        teamMentionToggle={teamMentionToggle}
        setMyIssues={setMyIssues}
      />

      <TitleBodyComment 
        qualifiers={qualifiers} 
        setQualifiers={setQualifiers}
        titleBodyCommentToggle={titleBodyCommentToggle}
        setMyIssues={setMyIssues}
      />

      <UserOrOrganization 
        qualifiers={qualifiers} 
        setQualifiers={setQualifiers}
        userOrOrgToggle={userOrOrgToggle}
        inputStyle={inputStyle}
        setInputStyle={setInputStyle}
        inputOK={inputOK}
        inputReset={inputReset}
        setMyIssues={setMyIssues} 
      />

      <WhenCreated
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        whenCreatedToggle={whenCreatedToggle}
        setMyIssues={setMyIssues}
      />

      <WhenUpdated
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        whenUpdatedToggle={whenUpdatedToggle}
        setMyIssues={setMyIssues}
      />

      <WhenClosed
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        whenClosedToggle={whenClosedToggle}
        setMyIssues={setMyIssues}
      />

      <WhenMerged
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        whenMergedToggle={whenMergedToggle}
        setMyIssues={setMyIssues}
      />

      <QualifierPicker 
        setTitleBodyCommentToggle={setTitleBodyCommentToggle}
        titleBodyCommentToggle={titleBodyCommentToggle}
        setIssueOrPrToggle={setIssueOrPrToggle}
        issueOrPrToggle={issueOrPrToggle}
        setUserOrOrgToggle={setUserOrOrgToggle}
        userOrOrgToggle={userOrOrgToggle}
        setOpenOrClosedToggle={setOpenOrClosedToggle}
        openOrClosedToggle={openOrClosedToggle}
        setPublicOrPrivateToggle={setPublicOrPrivateToggle}
        publicOrPrivateToggle={publicOrPrivateToggle}
        setAuthorToggle={setAuthorToggle}
        authorToggle={authorToggle}
        setAssigneeToggle={setAssigneeToggle}
        assigneeToggle={assigneeToggle}
        setMentionToggle={setMentionToggle}
        mentionToggle={mentionToggle}
        setTeamMentionToggle={setTeamMentionToggle}
        teamMentionToggle={teamMentionToggle}
        setCommenterToggle={setCommenterToggle}
        commenterToggle={commenterToggle}
        setInvolvesToggle={setInvolvesToggle}
        involvesToggle={involvesToggle}
        setLinkedToggle={setLinkedToggle}
        linkedToggle={linkedToggle}
        setMilestoneToggle={setMilestoneToggle}
        milestoneToggle={milestoneToggle}
        setProjectBoardToggle={setProjectBoardToggle}
        projectBoardToggle={projectBoardToggle}
        setCommitStatusToggle={setCommitStatusToggle}
        commitStatusToggle={commitStatusToggle}
        setBranchToggle={setBranchToggle}
        branchToggle={branchToggle}
        setLanguageToggle={setLanguageToggle}
        languageToggle={languageToggle}
        setNumOfCommentsToggle={setNumOfCommentsToggle}
        numOfCommentsToggle={numOfCommentsToggle}
        setInteractionsToggle={setInteractionsToggle}
        interactionsToggle={interactionsToggle}
        setReactionsToggle={setReactionsToggle}
        reactionsToggle={reactionsToggle}
        setDraftToggle={setDraftToggle}
        draftToggle={draftToggle}
        setReviewToggle={setReviewToggle}
        reviewToggle={reviewToggle}
        setMergeToggle={setMergeToggle}
        mergeToggle={mergeToggle}
        setArchiveToggle={setArchiveToggle}
        archiveToggle={archiveToggle}
        setLockedToggle={setLockedToggle}
        lockedToggle={lockedToggle}
        setMetadataToggle={setMetadataToggle}
        metadataToggle={metadataToggle}
        setLabelToggle={setLabelToggle}
        labelToggle={labelToggle}
        setWhenCreatedToggle={setWhenCreatedToggle}
        whenCreatedToggle={whenCreatedToggle}
        setWhenUpdatedToggle={setWhenUpdatedToggle}
        whenUpdatedToggle={whenUpdatedToggle}
        setWhenClosedToggle={setWhenClosedToggle}
        whenClosedToggle={whenClosedToggle}
        setWhenMergedToggle={setWhenMergedToggle}
        whenMergedToggle={whenMergedToggle}
        setOpen={setOpen}
      />      
    </div>   
  )
}

ExtendedSearch.propTypes = {
  qualifiers: PropTypes.array,
  setQualifiers: PropTypes.func,
  baseUrl: PropTypes.string,
  filter: PropTypes.string,
  currentPage: PropTypes.number,
  setUrl: PropTypes.func,
  setOpen: PropTypes.func,
  setLogin: PropTypes.func,
  setMyIssues: PropTypes.func
}

export default ExtendedSearch