const QualifierChecker = ( 
  findEntry, 
  qualifiers, 
  setQualifiers, 
  id,
  setMyIssues ) => {

  const helper = findEntry[0]
  let newQualifiers = []
  
  if (helper) {
    console.log('qualifiers:',qualifiers[0], 'regex:', helper)
  
    if (qualifiers.includes(helper)) {
      //if qualifiers is already used, get existing qualifiers up until
      //current qualifier
      newQualifiers = qualifiers.slice(0,qualifiers.indexOf(helper))
      //console.log('up until helper', newQualifiers)
  
      //skip the next entry and get the rest of the array to create a new
      //without the qualifier
      newQualifiers = newQualifiers.concat(qualifiers
        .slice(qualifiers.indexOf(helper)+1, qualifiers.length+1))
  
      //console.log('from helper til end', newQualifiers)
            
      //if the value is not 'no filter' add it to the rest. that way a 
      //qualifier is removed when 'everyhwere' is used
      if (id !== '' && id !== 'no filter') {
        newQualifiers.length === 0 ? 
          newQualifiers.push(`${id}`) : 
          newQualifiers.push(`+${id}`)
        //console.log('after adding new qualifier', newQualifiers)
      }
      setMyIssues(false)
      setQualifiers(newQualifiers)}
  } else {
    if (id !== '' && 'no filter') {
      setMyIssues(false)
      qualifiers.length === 0 ?
        setQualifiers(qualifiers.concat(`${id}`)) : 
        setQualifiers(qualifiers.concat(`+${id}`))      
    }
  }
}

export default QualifierChecker