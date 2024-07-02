package com.doctor.service;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.doctor.entity.Doctor;

@Service
public interface DoctorService {
   void addDoctor(Doctor doctor);
   List<Doctor> getAllDoctors();
   boolean isDoctorExist(long doctorId);
  /* Doctor getDoctorById(long doctorId); */
   Optional<Doctor> getDoctorById(long doctorId);
   boolean deleteDoctor(long doctorId);
   boolean updateDoctor(Doctor doctor);
   
   boolean updateStatusByDoctorId(long doctorId, String status);
   
   Doctor findByEmailPassword(Doctor doctor );
   
   List<String> findAllSpecializations();

   List<String> findAllLocations();
   List<Doctor> getDoctorsBySpecializationAndLocation(String specialization, String location);

   }
