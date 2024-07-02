package com.doctor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doctor.entity.Appointment;

import com.doctor.service.AppointmentService;
import com.doctor.service.DatabaseaSequencesGeneratorService;


@RestController
@RequestMapping("/api/v2")
public class AppointmentController {
	@Autowired
    private AppointmentService appService;
	 
    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
    
    @PostMapping("/addAppointments")
    public ResponseEntity<String> createDoctor(@RequestBody Appointment appointment) {
    	appointment.setAppId(databaseaSequencesGeneratorService.generateSequence(Appointment.SEQUENCE_NAME));
    	appService.addAppointment(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body("Appointment added successfully.");
    }
    
    
    @GetMapping("/allAppointments")
	public ResponseEntity<List<Appointment>> getAllAppointments(){
		List<Appointment> appointment = appService.getAllAppointments();
		ResponseEntity<List<Appointment>> entity = new ResponseEntity<>(appointment,HttpStatus.OK);
		return entity;
	}
    
    
    @GetMapping(value="/getAppointment/{appId}")
	public ResponseEntity<Appointment> getAppointment(@PathVariable("appId") long appId){
		
		Appointment appoint=appService.getAppointmentById(appId);
		
		if(appoint !=null) {
			return ResponseEntity.ok(appoint);
			
		}else {
			return ResponseEntity.notFound().build();
		}
		
	}
    
    @DeleteMapping("/deleteAppointment/{appId}")
	public ResponseEntity<Boolean> deleteAppointment(@PathVariable("appId") long appId){
		
		boolean flag;
		if(appService.isAppointmentExist(appId)){
			flag = appService.deleteAppointment(appId);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag,HttpStatus.OK);
		
	}
    
    
    @PutMapping(value="/updateAppointment/{appId}")
	public ResponseEntity<Boolean> updateAppointment(@PathVariable("appId") long appId, @RequestBody Appointment appointment)
	{
		
		boolean flag;
		if(appService.isAppointmentExist(appId)){
			flag = appService.updateAppointment(appointment);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag, HttpStatus.OK);
		
	}
    
    
    @GetMapping("/appointments/doctor/{doctorId}")
    public List<Appointment> getAppointmentByDoctorId(@PathVariable long doctorId) {
    	return appService.getAppointmentByDoctorId(doctorId);

}
    
    
    @GetMapping("/appointments/{userId}")
    public List<Appointment> getAppointmentsByUserId(@PathVariable Long userId) {
		return appService.getAppointmentsByUserId(userId);
        
}
    

	
   
}
