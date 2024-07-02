package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.Schedule;
@Service
public interface ScheduleService {
	void addSchedule(Schedule schedule);
	
	List<Schedule> getAllSchedule();
	boolean isScheduleExist(long scheduleId);
	Schedule getScheduleById(long scheduleId);
	boolean deleteSchedule(long scheduleId);
	boolean updateSchedule(Schedule schedule);
	
	List<Schedule> getSchedulesByDoctorId(long doctorId);

}
