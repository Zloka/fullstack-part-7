import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavMenu = ({ username, onLogout }) => {

  return (
    <div>
      <span>
      <Link to="/blogs">blogs</Link>
      </span>
     <span>
     <Link to="/users">users</Link>
     </span>
     
      {username} is logged in.
      <button onClick={onLogout}>log out</button>
    </div>
  )
}

NavMenu.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default NavMenu;


