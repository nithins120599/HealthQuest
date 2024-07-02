import { useState, React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeMenu from './HomeMenu';
import AdminHomeMenu from './AdminHomeMenu';
import AdminLogin from './AdminLogin';
import Contact from '../HomeComponent/Contact';
import About from '../HomeComponent/About';
import Home from '../HomeComponent/Home';
import AdminHome from './AdminHome';
import Logout from '../HomeComponent/Logout';
import ViewAllDoctors from './ViewAllDoctors';
import DoctorRegistration from '../DoctorComponent/DoctorRegistration';
import DoctorLogin from '../DoctorComponent/DoctorLogin';
import DoctorMenu from '../DoctorComponent/DoctorMenu';
import DoctorHome from '../DoctorComponent/DoctorHome';
import UserLogin from '../UserComponent/UserLogin';
import PharmacyLogin from '../PharmacyComponent/PharmacyLogin';
import PharmacyMenu from '../PharmacyComponent/PharmacyMenu';
import PharmacyHome from '../PharmacyComponent/PharmacyHome';
import UserRegistration from '../UserComponent/UserRegistration';
import UserMenu from '../UserComponent/UserMenu';
import UserHome from '../UserComponent/UserHome';
import DoctorProfile from '../DoctorComponent/DoctorProfile';
import ViewAllUsers from './ViewAllUsers';
import AddSchedule from '../DoctorComponent/AddSchedule';
import ViewSchedule from '../DoctorComponent/ViewSchedule';
import AddMedicalHistory from '../UserComponent/AddMedicalHistory';
import ViewMedicalHistory from '../UserComponent/ViewMedicalHistory';
import AddBankAccount from '../UserComponent/AddBankAccount';
import AddMedicine from './AddMedicne';
import UserProfile from '../UserComponent/UserProfile';
import ViewDoctorSchedule from '../UserComponent/ViewDoctorSchedule';
import PaymentPage from '../UserComponent/PaymentPage';
import ViewDoctorAppointments from '../DoctorComponent/ViewDoctorAppointments';
import AddPrescription from '../DoctorComponent/AddPrescription';
import BookedAppointments from '../UserComponent/BookedAppointments';
import PharmacyRegistration from '../PharmacyComponent/PharmacyRegistration';



export default function MainMenu() {
  const [loginState, setLoginState] = useState("");
  return (
    <div>
      <BrowserRouter>
        <main>

        {loginState === "Admin" ? (
            <AdminHomeMenu />
          ) : loginState === "Doctor" ? (
            <DoctorMenu />
          ) : loginState === "Pharmacy" ? (
            <PharmacyMenu />
          ) : loginState === "User" ? (
            <UserMenu />
          ) : (
            <HomeMenu />
          )}
          
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />

            <Route path="/AdminLogin" element={<AdminLogin loginState={loginState} setLoginState={setLoginState} />} />

            {loginState == "Admin" && (
              <>
                <Route path="/admin/adminmenu" element={<AdminHomeMenu />} />
                <Route path="/admin/adminhome" element={<AdminHome />} />
                <Route path="/admin/viewalldoctors" element={<ViewAllDoctors />} />
                <Route path="/admin/viewallusers" element={<ViewAllUsers />} />
                <Route path="/admin/addmedicine" element={<AddMedicine/>}/>
                <Route path="/logout" element={<Logout loginState={loginState} setLoginState={setLoginState} />} />


              </>
            )
            }

            <Route path="/DoctorLogin" element={<DoctorLogin loginState={loginState} setLoginState={setLoginState} />} />

            {
              loginState =="Doctor" && (
                <>
                  <Route path="/doctor/doctormenu" element={<DoctorMenu />} />
                  <Route path="/doctor/doctorhome" element={<DoctorHome />} />
                  <Route path="/doctor/doctorprofile" element={<DoctorProfile />} />
                  <Route path="/doctor/addschedule" element={<AddSchedule />} />
                  <Route path="/doctor/viewschedule" element={<ViewSchedule />} />
                  <Route path="/doctor/viewallappointments" element={<ViewDoctorAppointments />} />
                  <Route path="/UserComponent/ViewMedicalHistory/:userId" element={<ViewMedicalHistory />} />
                  <Route path="/AddPrescription/:appId" element={<AddPrescription />} />
                 
                  <Route path="/logout" element={<Logout loginState={loginState} setLoginState={setLoginState} />} />


                </>
              )}
               <Route path="/UserLogin" element={<UserLogin loginState={loginState} setLoginState={setLoginState} />} />

{
  loginState =="User" && (
    <>
      <Route path="/user/usermenu" element={<UserMenu />} />
      <Route path="/user/userhome" element={<UserHome />} />
      <Route path="/user/userprofile" element={<UserProfile />} />
      <Route path="/user/addmedicalhistory" element={<AddMedicalHistory />} />
      <Route path="/user/ViewDoctorSchedule/:doctorId" element={<ViewDoctorSchedule />} />
      <Route path="/user/payment" element={<PaymentPage />} />
      <Route path="/user/viewmedicalhistory/:userId" element={<ViewMedicalHistory />} />
      <Route path="/user/bookedappointments/:userId" element={<BookedAppointments />} />
      <Route path="/user/addbankaccount" element={<AddBankAccount />} />
      <Route path="/logout" element={<Logout loginState={loginState} setLoginState={setLoginState} />} />


    </>
  )}

<Route path="/PharmacyLogin" element={<PharmacyLogin loginState={loginState} setLoginState={setLoginState} />} />

{
  loginState =="Pharmacy" && (
    <>
      <Route path="/pharmacy/pharmacymenu" element={<PharmacyMenu />} />
      <Route path="/pharmacy/PharmacyHome" element={<PharmacyHome />} />

      <Route path="/logout" element={<Logout loginState={loginState} setLoginState={setLoginState} />} />


    </>
  )}
            <Route path='/doctor/newregistration' element={<DoctorRegistration />} />
            <Route path='/user/userregistration' element={<UserRegistration />} />
            <Route path='/pharmacy/pharmacyregistration' element={<PharmacyRegistration />} />
            

            {/*  <Route path='*' element={<PageNotFound />} /> */}
          </Routes>
        </main>

      </BrowserRouter>
    </div>
  )
}
