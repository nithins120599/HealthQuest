import React from 'react'
import { Link } from 'react-router-dom';
import contactlogo from './images/about.webp'

export default function About() {
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">About Us:</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  We are a team of passionate medical professionals dedicated to providing exceptional healthcare services. Our mission is to transform the way you
                  experience healthcare by delivering innovative, personalized, and compassionate care.
                </p>
                <Link
                  to="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <img src={contactlogo}
              width="550"
              height="550"
              alt="About"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Innovative Care: Utilizing the latest medical advancements to provide state-of-the-art treatments and services.
                Ensuring that every patient feels heard, valued, and cared for.
                Tailoring our care to meet the unique needs of each individual.
                age.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
              To create a future where healthcare is accessible, efficient, and personalized for every individual. We envision a world where 
              technology enhances the doctor-patient relationship and transforms the way healthcare is delivered.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Values</h2>
              <p className="text-gray-500 dark:text-gray-400">
              Our team comprises talented individuals with backgrounds in medicine, software development, and design. Together, we are committed to revolutionizing healthcare delivery through technology. 
              With a shared passion for improving lives, we work tirelessly to create solutions that make a meaningful impact.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
              Thank you for choosing as your
               trusted healthcare companion. We are dedicated to supporting you on your journey towards better health.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
