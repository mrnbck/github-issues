const hideShowEditor = ( 
  comment, 
  setChangeMode, 
  changeMode, 
  setUpdateComment ) => {
  
  setUpdateComment(comment.body)
  if (!changeMode) {
    setChangeMode(true)
    document.getElementById(`${comment.id}_textarea`)
      .style.visibility = 'visible'
    document.getElementById(`${comment.id}_textarea`)
      .style.padding = '10px'
    document.getElementById(`${comment.id}_textarea`)
      .style.margin = '10px'
    document.getElementById(`${comment.id}_textarea`)
      .style.height = '200px'
  
    document.getElementById(`${comment.id}_list`)
      .style.visibility = 'hidden'
    document.getElementById(`${comment.id}_list`)
      .style.padding = '0px'
    document.getElementById(`${comment.id}_list`)
      .style.height = '0px'

    document.getElementById(`${comment.id}_button`)
      .style.visibility = 'visible'
    document.getElementById(`${comment.id}_button`)
      .style.height = 'auto'
    document.getElementById(`${comment.id}_button`)
      .style.marginBottom = '10px'
    document.getElementById(`${comment.id}_cancel`)
      .style.visibility = 'visible'
    document.getElementById(`${comment.id}_cancel`)
      .style.height = 'auto'
    document.getElementById(`${comment.id}_cancel`)
      .style.marginBottom = '10px'
  }
  if(changeMode) {
    setChangeMode(false)
    document.getElementById(`${comment.id}_textarea`)
      .style.visibility = 'hidden'
    document.getElementById(`${comment.id}_textarea`)
      .style.padding = '0px'
    document.getElementById(`${comment.id}_textarea`)
      .style.margin = '0px'
    document.getElementById(`${comment.id}_textarea`)
      .style.height = '0px'
          
    document.getElementById(`${comment.id}_list`)
      .style.visibility = 'visible'
    document.getElementById(`${comment.id}_list`)
      .style.padding = '5px 25px 15px'          
    document.getElementById(`${comment.id}_list`)
      .style.height = 'auto'

    document.getElementById(`${comment.id}_button`)
      .style.visibility = 'hidden'
    document.getElementById(`${comment.id}_button`)
      .style.height = '0px'
    document.getElementById(`${comment.id}_button`)
      .style.marginBottom = '0px'
    document.getElementById(`${comment.id}_cancel`)
      .style.visibility = 'hidden'
    document.getElementById(`${comment.id}_cancel`)
      .style.height = '0px'
    document.getElementById(`${comment.id}_cancel`)
      .style.marginBottom = '0px'
  }   
}

export default hideShowEditor