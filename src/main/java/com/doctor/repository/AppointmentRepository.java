package com.doctor.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doctor.entity.Appointment;
import com.doctor.entity.Doctor;

public interface AppointmentRepository  extends MongoRepository<Appointment, Long>{
	List<Appointment> getAppointmentsByDoctorId(long doctorId);

	List<Appointment> findByDoctorId(long doctorId);
	
	List<Appointment> findByUserId(Long userId);
	
	
}
