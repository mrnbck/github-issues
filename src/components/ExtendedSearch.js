import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import IssueOrPr from './fixed-qualifiers/IssueOrPr'
import TitleBodyComment from './fixed-qualifiers/TitleBodyComment'
import UserOrOrganization from './input-qualifiers/UserOrOrganization'
import OpenOrClosed from './fixed-qualifiers/OpenOrClosed'
import QualifierPicker from './QualifierPicker'
import PublicOrPrivate from './fixed-qualifiers/PublicOrPrivate'
import Author from './fixed-qualifiers/Author'
import Assignee from './fixed-qualifiers/Assignee'
import Mention from './fixed-qualifiers/Mention'
import TeamMention from './fixed-qualifiers/TeamMention'
import Commenter from './fixed-qualifiers/Commenter'
import Involved from './fixed-qualifiers/Involved'
import Linked from './fixed-qualifiers/Linked'
import Milestone from './fixed-qualifiers/Milestone'
import ProjectBoard from './fixed-qualifiers/ProjectBoard'
import CommitStatus from './fixed-qualifiers/CommitStatus'
import BranchName from './fixed-qualifiers/BranchName'
import Language from './fixed-qualifiers/Language'
import NumberOfComments from './fixed-qualifiers/NumberOfComments'
import NumberOfInteractions from './fixed-qualifiers/NumberOfInteractions'
import NumberOfReactions from './fixed-qualifiers/NumberOfReactions'
import Draft from './fixed-qualifiers/Draft'
import Review from './fixed-qualifiers/Review'
import Merge from './fixed-qualifiers/Merged'
import Archived from './fixed-qualifiers/Archived'
import Locked from './fixed-qualifiers/Locked'
import Metadata from './fixed-qualifiers/Metadata'
import Label from './fixed-qualifiers/Label'
import WhenCreated from './fixed-qualifiers/WhenCreated'
import WhenUpdated from './fixed-qualifiers/WhenUpdated'
import WhenClosed from './fixed-qualifiers/WhenClosed'
import WhenMerged from './fixed-qualifiers/WhenMerged'

const ExtendedSearch = ({ 
  qualifiers, setQualifiers, setMyIssues,
  baseUrl,filter, currentPage, setUrl, setOpen }) => {

  const [issueOrPrToggle, setIssueOrPrToggle] = useState(true)
  const [titleBodyCommentToggle, setTitleBodyCommentToggle] = useState(false)
  const [userOrOrgToggle, setUserOrOrgToggle] = useState(false)
  const [openOrClosedToggle, setOpenOrClosedToggle] = useState(false)
  const [publicOrPrivateToggle, setPublicOrPrivateToggle] = useState(false)
  const [authorToggle, setAuthorToggle] = useState(false)
  const [assigneeToggle, setAssigneeToggle] = useState(false)
  const [mentionToggle, setMentionToggle] = useState(false)
  const [teamMentionToggle, setTeamMentionToggle] = useState(false)
  const [commenterToggle, setCommenterToggle] = useState(false)
  const [involvesToggle, setInvolvesToggle] = useState(false)
  const [linkedToggle, setLinkedToggle] = useState(false)
  const [milestoneToggle, setMilestoneToggle] = useState(false)
  const [projectBoardToggle, setProjectBoardToggle] = useState(false)
  const [commitStatusToggle, setCommitStatusToggle] = useState(false)
  const [branchToggle, setBranchToggle] = useState(false)
  const [languageToggle, setLanguageToggle] = useState(false)
  const [numOfCommentsToggle, setNumOfCommentsToggle] = useState(false)
  const [interactionsToggle, setInteractionsToggle] = useState(false)
  const [reactionsToggle, setReactionsToggle] = useState(false)
  const [draftToggle, setDraftToggle] = useState(false)
  const [reviewToggle, setReviewToggle] = useState(false)
  const [mergeToggle, setMergeToggle] = useState(false)
  const [archiveToggle, setArchiveToggle] = useState(false)
  const [lockedToggle, setLockedToggle] = useState(false)
  const [metadataToggle, setMetadataToggle] = useState(false)
  const [labelToggle, setLabelToggle] = useState(false)
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

  const style = {
    width: 'max-content'
  }

  return (
    <div style={style}>
      <h2>What would you like to search?</h2>
      <IssueOrPr qualifiers={qualifiers} setQualifiers={setQualifiers} 
        issueOrPrToggle={issueOrPrToggle}
      />
     
      <TitleBodyComment qualifiers={qualifiers} setQualifiers={setQualifiers}
        titleBodyCommentToggle={titleBodyCommentToggle}
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

      <OpenOrClosed
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        openOrClosedToggle={openOrClosedToggle}
      />

      <PublicOrPrivate
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        publicOrPrivateToggle={publicOrPrivateToggle}
      />

      <Author
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        authorToggle={authorToggle}
      />

      <Assignee
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        assigneeToggle={assigneeToggle}
      />

      <Mention
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        mentionToggle={mentionToggle}
      />

      <TeamMention
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        teamMentionToggle={teamMentionToggle}
      />

      <Commenter
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        commenterToggle={commenterToggle}
      />

      <Involved
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        involvesToggle={involvesToggle}
      />

      <Linked
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        linkedToggle={linkedToggle}
      />

      <Milestone
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        milestoneToggle={milestoneToggle}
      />

      <ProjectBoard
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        projectBoardToggle={projectBoardToggle}
      />

      <CommitStatus
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        commitStatusToggle={commitStatusToggle}
      />

      <BranchName
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        branchToggle={branchToggle}
      />

      <Language
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        languageToggle={languageToggle}
      />

      <NumberOfComments
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        numOfCommentsToggle={numOfCommentsToggle}
      />

      <NumberOfInteractions
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        interactionsToggle={interactionsToggle}
      />

      <NumberOfReactions
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        reactionsToggle={reactionsToggle}
      />

      <Draft
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        draftToggle={draftToggle}
      />

      <Review
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        reviewToggle={reviewToggle}
      />

      <Merge
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        mergeToggle={mergeToggle}
      />

      <Archived
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        archiveToggle={archiveToggle}
      />

      <Locked
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        lockedToggle={lockedToggle}
      />

      <Label
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        labelToggle={labelToggle}
        setMyIssues={setMyIssues} 
      />

      <Metadata
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        metadataToggle={metadataToggle}
      />

      <WhenCreated
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        whenCreatedToggle={whenCreatedToggle}
      />

      <WhenUpdated
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        whenUpdatedToggle={whenUpdatedToggle}
      />

      <WhenClosed
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        whenClosedToggle={whenClosedToggle}
      />

      <WhenMerged
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        whenMergedToggle={whenMergedToggle}
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
  currentPage: PropTypes.string,
  setUrl: PropTypes.func,
  setOpen: PropTypes.func,
  setLogin: PropTypes.func,
  setMyIssues: PropTypes.func
}

export default ExtendedSearch