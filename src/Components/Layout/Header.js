import React from 'react'
import './Header.css'
// import { Link } from 'react-router'

const Header = () => {
  return (
    <header>
      <nav className='navbar'>
        <h1>Soulmate</h1>
        <ul>
          <li>
            {/* <Link to='/Fav'>Saved</Link> */}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
