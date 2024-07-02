import React from 'react';
import { Link } from 'react-router-dom';

export default function UserMenu() {
  const userId = sessionStorage.getItem("userId");
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#93d968' }}>
        <div className="container-fluid justify-content-center">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/user/userhome">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user/userprofile">User Profile</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link mx-2 dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Medical History
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/user/addmedicalhistory">Add Medical History</Link></li>
                  <li><Link className="dropdown-item" to={`/user/viewmedicalhistory/${userId}`}>View Medical History</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/user/bookedappointments/${userId}`} tabIndex="-1" aria-disabled="true">Booked Appointments</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user/addbankaccount" tabIndex="-1" aria-disabled="true">Bank Account</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout" tabIndex="-1" aria-disabled="true">Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
