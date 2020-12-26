import React from 'react'

const Notification = ({ message }) => {
  return message !== null ? <h3>{message}</h3> : null
}

export default Notification