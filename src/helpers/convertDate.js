import convertMonth from './convertMonth'  

const convertDate = (createdAt, noTime) => {

  const regex = /([^-|T|Z])+/g
  const date = createdAt.match(regex)
  const year = date[0]
  const month = convertMonth(date[1])
  const day = date[2]
  const time = date[3]
  if (noTime) {
    return `${year} ${month} ${day}`
  } else return `${year} ${month} ${day} at ${time}`
}

export default convertDate