package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Appointment;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.AppointmentRepository;
import com.doctor.repository.DoctorRepository;
import com.doctor.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService{
	@Autowired
    private AppointmentRepository appRepo;

	@Override
	public void addAppointment(Appointment appointment) {
		appRepo.save(appointment);
		
	}

	@Override
	public List<Appointment> getAllAppointments() {
		List<Appointment> appo = appRepo.findAll();
		return appo;
	}
	

	@Override
	public boolean isAppointmentExist(long appId) {
		Optional<Appointment> appo = appRepo.findById(appId);
		if (appo.isPresent()) {
			return true;
		}
		return false;
	}
	
	
	@Override
	public Appointment getAppointmentById(long appId) {
		Optional<Appointment> appointment = appRepo.findById(appId);
		Appointment app;
		if (appointment.isPresent()) {
			app = appointment.get();
		} else {
			throw new ResourceNotFoundException("Appointment", "appId", appId);
		}
		return app;
	}

	

	@Override
	public boolean deleteAppointment(long appId) {
		Optional<Appointment> appoint = appRepo.findById(appId);
		if (appoint.isPresent()) {
			appRepo.deleteById(appId);
			return true;
		} else {
			return false;
		}
	}
	
	
	@Override
	public boolean updateAppointment(Appointment appointment) {
		Optional<Appointment> app = appRepo.findById(appointment.getAppId());
		if (app.isPresent()) {
			appRepo.save(appointment);
			return true;
		} else {
			return false;
		}
	}
	@Override
	public List<Appointment> getAppointmentByDoctorId(long doctorId) {
		 return appRepo.findByDoctorId(doctorId);
	}

	@Override
	public List<Appointment> getAppointmentsByUserId(Long userId) {
		
		 return appRepo.findByUserId(userId);

	}
	
}
