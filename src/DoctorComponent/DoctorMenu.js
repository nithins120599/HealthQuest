import React from 'react';
import { Link } from 'react-router-dom';

export default function DoctorMenu() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#dbafd4' }}>
        <div className="container-fluid justify-content-center">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/doctor/doctorhome">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/doctorprofile">Profile</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link mx-2 dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Schedules
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="/doctor/addschedule">Add Schedules</Link></li>
                  <li><Link className="dropdown-item" to="/doctor/viewschedule">View Schedules</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/doctor/viewallappointments" tabIndex="-1" aria-disabled="true">ViewAllAppointments</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout" tabIndex="-1" aria-disabled="true">LogOut</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
