package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.Appointment;

@Service
public interface AppointmentService {
	void addAppointment(Appointment appointment);
	
	List<Appointment> getAllAppointments();
	boolean isAppointmentExist(long appId);
	Appointment getAppointmentById(long appId);
	boolean deleteAppointment(long appId);
	boolean updateAppointment(Appointment appointment);
	
	
	List<Appointment> getAppointmentByDoctorId(long doctorId);
	
	List<Appointment> getAppointmentsByUserId(Long userId);

}
