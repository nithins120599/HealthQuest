import React from 'react'
import { Link } from 'react-router-dom';

export default function AdminHomeMenu() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#6CF5E9 ' }}>

      <div className="container-fluid justify-content-center">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/viewalldoctors">ViewAllDoctors</Link>
            </li>
            
           
            <li className="nav-item">
              <Link className="nav-link" to="#" tabIndex="-1" aria-disabled="true">Appointments</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/viewallusers" tabIndex="-1" aria-disabled="true">Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/addmedicine" tabIndex="-1" aria-disabled="true">Medicines</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout" tabIndex="-1" aria-disabled="true">LogOut</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}
