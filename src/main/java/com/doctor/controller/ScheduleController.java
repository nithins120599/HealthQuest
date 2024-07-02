package com.doctor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doctor.entity.Doctor;
import com.doctor.entity.Schedule;
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.DoctorService;
import com.doctor.service.ScheduleService;

@RestController
@RequestMapping("/api/v2")
public class ScheduleController {
	@Autowired
    private ScheduleService scheduleSer;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;

	/*
	 @PostMapping("/AddSchedule")
	    public ResponseEntity<String> createSchedule(@RequestBody Schedule schedule) {
		 schedule.setScheduleId(databaseaSequencesGeneratorService.generateSequence(Schedule.SEQUENCE_NAME));
		 scheduleSer.addSchedule(schedule);
	        return ResponseEntity.status(HttpStatus.CREATED).body("Schedule added successfully.");
	    }
	    */
	
	@PostMapping("/AddSchedule")
	public ResponseEntity<String> createSchedule(@RequestBody List<Schedule> schedules) {
	    for (Schedule schedule : schedules) {
	        schedule.setScheduleId(databaseaSequencesGeneratorService.generateSequence(Schedule.SEQUENCE_NAME));
	        scheduleSer.addSchedule(schedule);
	    }
	    return ResponseEntity.status(HttpStatus.CREATED).body("Schedules added successfully.");
	}

	 
	 @GetMapping("/allSchedules")
		public ResponseEntity<List<Schedule>> getAllSchedulessss(){
			List<Schedule> sched = scheduleSer.getAllSchedule();
			ResponseEntity<List<Schedule>> entity = new ResponseEntity<>(sched,HttpStatus.OK);
			return entity;
		}
	 
	 

		@GetMapping(value="/getSchedule/{scheduleId}")
		public ResponseEntity<Schedule> getSchedule(@PathVariable("scheduleId") long scheduleId){
			
			Schedule sched=scheduleSer.getScheduleById(scheduleId);
			
			if(sched !=null) {
				return ResponseEntity.ok(sched);
				
			}else {
				return ResponseEntity.notFound().build();
			}
			
		}
		
		
		@DeleteMapping("/deleteSchedule/{scheduleId}")
		public ResponseEntity<Boolean> deleteSchedule(@PathVariable("scheduleId") long scheduleId){
			
			boolean flag;
			if(scheduleSer.isScheduleExist(scheduleId)){
				flag = scheduleSer.deleteSchedule(scheduleId);
			}else {
				flag = false;
			}
			
			return new ResponseEntity<>(flag,HttpStatus.OK);
			
		}
		
		@PutMapping(value="/updateSchedule/{scheduleId}")
		public ResponseEntity<Boolean> updateSchedule(@PathVariable("scheduleId") long scheduleId, @RequestBody Schedule schedule)
		{
			
			boolean flag;
			if(scheduleSer.isScheduleExist(scheduleId)){
				flag = scheduleSer.updateSchedule(schedule);
			}else {
				flag = false;
			}
			
			return new ResponseEntity<>(flag, HttpStatus.OK);
			
		}


		@GetMapping("/getSchedulesByDoctorId/{doctorId}")
		public ResponseEntity<List<Schedule>> getSchedulesByDoctorId(@PathVariable long doctorId)
		{
			List<Schedule> schedules = scheduleSer.getSchedulesByDoctorId(doctorId);
			return new ResponseEntity<>(schedules, HttpStatus.OK);
		}
		

}
