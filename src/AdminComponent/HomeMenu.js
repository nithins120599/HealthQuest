import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../HomeComponent/images/doctorlogo.jpg'

export default function HomeMenu() {
  return (
    <div>
      <header className="site-header py-1">
      <nav className="navbar navbar-expand-lg navbar-dark p-3" id="mainNav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <img src={logo} style={{marginLeft: '20px', width: '160px', height: '170px'}} className="img img-sm img-fluid" alt="Logo" />

          </Link>
          <button className="navbar-toggler" style={{backgroundColor: 'rgb(7, 7, 8)'}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link mx-2 active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2 active" aria-current="page" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to="/contact">Contact</Link>
              </li>
             
              <li className="nav-item dropdown">
                <Link className="nav-link mx-2 dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Logins
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/AdminLogin">Admin</Link></li>
                  <li><Link className="dropdown-item" to="/DoctorLogin">Doctor</Link></li>
                  <li><Link className="dropdown-item" to="/UserLogin">User</Link></li>
                  <li><Link className="dropdown-item" to="/PharmacyLogin">Pharmacy</Link></li>
                </ul>
              </li>
             
            </ul>
          </div>
        </div>
      </nav>
    </header>

    

    </div>
  )
}
