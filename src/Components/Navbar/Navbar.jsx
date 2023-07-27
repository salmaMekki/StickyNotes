import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
export default function Navbar(props) {
  return (
    <>
    <nav className={`${styles.test} navbar navbar-expand-lg navbar-light`}>
  <div className="container">
    <Link to={'/about'} className={`${styles.logo} navbar-brand fs-5`} >Sticky Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
{props.userData?   <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       <li className={`${styles.logout} nav-item `}>
                 <Link to={'/home'} className={` nav-link`}  >Notes</Link>

       </li>
       <li className={`${styles.logout} nav-item `}>
         <a className={` nav-link`} onClick={props.logout} >Logout</a>
       </li>
     
     </ul>:''}
   
     
    </div>
  </div>
</nav>
    </>
  )
}
