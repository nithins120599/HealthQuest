package com.doctor.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.doctor.entity.Doctor;
import org.springframework.data.mongodb.repository.Query;


public interface DoctorRepository extends MongoRepository<Doctor, Long>{

	  @Query("{'doctorId' : ?0}")
	    public void updateStatusByDoctorId(long doctorId, String status);
	  
	  Doctor findByEmailAndPassword(String email, String password);
	  
	  

	    @Query(value = "{}", fields = "{ 'specialization' : 1}")
	    List<Doctor> findAllSpecializations();

	    @Query(value = "{}", fields = "{ 'location' : 1}")
	    List<Doctor> findAllLocations();
	    
	    
	    List<Doctor> findBySpecializationAndLocation(String specialization, String location);

}


