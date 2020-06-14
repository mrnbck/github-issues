import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import IssueOrPr from './qualifiers/IssueOrPr'
import TitleBodyComment from './qualifiers/TitleBodyComment'
import UserOrOrganization from './qualifiers/UserOrOrganization'
import OpenOrClosed from './qualifiers/OpenOrClosed'
import QualifierPicker from './QualifierPicker'
import PublicOrPrivate from './qualifiers/PublicOrPrivate'
import Author from './qualifiers/Author'
import Assignee from './qualifiers/Assignee'
import Mention from './qualifiers/Mention'
import TeamMention from './qualifiers/TeamMention'
import Commenter from './qualifiers/Commenter'
import Involved from './qualifiers/Involved'
import Linked from './qualifiers/Linked'
import Milestone from './qualifiers/Milestone'
import ProjectBoard from './qualifiers/ProjectBoard'
import CommitStatus from './qualifiers/CommitStatus'
import BranchName from './qualifiers/BranchName'
import Language from './qualifiers/Language'
import NumberOfComments from './qualifiers/NumberOfComments'
import Interactions from './qualifiers/Interactions'
import Reactions from './qualifiers/Reactions'
import Draft from './qualifiers/Draft'
import Review from './qualifiers/Review'
import Merge from './qualifiers/Merged'
import Archived from './qualifiers/Archived'
import Locked from './qualifiers/Locked'
import Metadata from './qualifiers/Metadata'

const ExtendedSearch = ({ 
  qualifiers, setQualifiers,
  baseUrl,filter, currentPage, setUrl }) => {

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

  return (
    <div>
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

      <Interactions
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        interactionsToggle={interactionsToggle}
      />

      <Reactions
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

      <Metadata
        qualifiers={qualifiers}
        setQualifiers={setQualifiers}
        metadataToggle={metadataToggle}
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
  setUrl: PropTypes.func
}

export default ExtendedSearch