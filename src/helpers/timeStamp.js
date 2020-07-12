const timeStamp = () => {
  const currentTime = new Date()
  const year = currentTime.getFullYear()
  const month = currentTime.getMonth() > 9 ? 
    currentTime.getMonth()+1 : `0${currentTime.getMonth()+1}`
  
  const day = currentTime.getDate() > 9 ? 
    currentTime.getDate() : `0${currentTime.getDate()}`

  const hours = currentTime.getHours() > 9 ? 
    currentTime.getHours()-2 : `0${currentTime.getHours()-2}`

  const minutes = currentTime.getMinutes() > 9 ? 
    currentTime.getMinutes() : `0${currentTime.getMinutes()}`

  const seconds = currentTime.getSeconds() > 9 ? 
    currentTime.getSeconds() : `0${currentTime.getSeconds()}`


  const timeStamp=`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`

  return timeStamp
}

export default timeStamp