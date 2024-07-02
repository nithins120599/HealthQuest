import React from 'react'
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div>
      <main>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center" style={{ backgroundColor: '#6EE7B7' }}>


        <div className="col-md-10 p-lg-5 mx-auto my-5">
          <h1 className="display-4 fw-normal text-center">HealQuest</h1>
          <p className="lead fw-normal">Welcome to HealQuest, your virtual healthcare companion. Seamlessly connect with experienced doctors, schedule virtual appointments, receive personalized treatments, and have medications delivered to your doorstep. Experience hassle-free healthcare from the comfort of your home with HealQuest</p>
          {/*<a className="btn btn-outline-secondary" href="">Get Started</a>*/}
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-purple-300 dark:bg-purple-800">


        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Explore our comprehensive healthcare services tailored to your needs.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-gray-900 dark:text-gray-50"
              >
                <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z"></path>
              </svg>
              <h3 className="text-xl font-bold">Primary Care</h3>
              <p className="text-gray-500 dark:text-gray-400">Comprehensive primary care services for your well-being.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-gray-900 dark:text-gray-50"
              >
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                <circle cx="20" cy="10" r="2"></circle>
              </svg>
              <h3 className="text-xl font-bold">Specialty Care</h3>
              <p className="text-gray-500 dark:text-gray-400">Access to a wide range of specialized medical services.</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6 shadow-sm transition-all hover:scale-105 hover:shadow-md dark:bg-gray-950">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-gray-900 dark:text-gray-50"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path>
                <rect x="2" y="6" width="14" height="12" rx="2"></rect>
              </svg>
              <h3 className="text-xl font-bold">Telehealth</h3>
              <p className="text-gray-500 dark:text-gray-400">Convenient virtual care options for your health needs.</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div className="container my-5" style={{ backgroundColor: '#ffffff' }}>

      {/* Footer */}
      <footer className="text-center text-white" style={{ backgroundColor: '#ffffff' }}>
        {/* Grid container */}
        <div className="container">
          {/* Section: Links */}
          <section className="mt-5">
            {/* Grid row*/}
            <div className="row text-center d-flex justify-content-center pt-5">
              {/* Grid column */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#" className="text-black">About us</Link>
                </h6>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#" className="text-black">Online Doctor Consultation</Link>
                </h6>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#" className="text-black">Pharmacy</Link>
                </h6>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#" className="text-black">Appointment Scheduling</Link>
                </h6>
              </div>
              {/* Grid column */}

              {/* Grid column */}
              <div className="col-md-2">
                <h6 className="text-uppercase font-weight-bold">
                  <Link to="#" className="text-black">Diagnostic Services</Link>
                </h6>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row*/}
          </section>
          {/* Section: Links */}

          <hr className="my-5" />

          {/* Section: Text */}
          <section className="mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <p className="text-black">
                Our doctor app is dedicated to providing convenient and accessible healthcare solutions for patients worldwide. With a team of experienced professionals and cutting-edge technology, we strive to revolutionize the way people access medical services.
                </p>
              </div>
            </div>
          </section>
          {/* Section: Text */}

          {/* Section: Social */}
          <section className="text-center mb-5">
            <Link to="#" className="text-black me-4">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to="#" className="text-black me-4">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="#" className="text-black me-4">
              <i className="fab fa-google"></i>
            </Link>
            <Link to="#" className="text-black me-4">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="#" className="text-black me-4">
              <i className="fab fa-linkedin"></i>
            </Link>
            <Link to="#" className="text-black me-4">
              <i className="fab fa-github"></i>
            </Link>
          </section>
          {/* Section: Social */}
        </div>
        {/* Grid container */}

        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 5, 12, 0)' }}>
          <Link className="text-black" to="https://mdbootstrap.com/">
            © 2020 Copyright:healquest.com
          </Link>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </div>
    {/*End of .container */} 

    </div>
  )
}
