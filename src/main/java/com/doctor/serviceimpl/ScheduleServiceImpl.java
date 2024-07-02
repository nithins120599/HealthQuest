package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Schedule;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.DoctorRepository;
import com.doctor.repository.ScheduleRepository;
import com.doctor.service.ScheduleService;
@Service
public class ScheduleServiceImpl implements ScheduleService{
	@Autowired
    private ScheduleRepository scheduleRepo;

	@Override
	public void addSchedule(Schedule schedule) {
		// TODO Auto-generated method stub
		scheduleRepo.save(schedule);
	}

	@Override
	public List<Schedule> getAllSchedule() {
		List<Schedule> sch=scheduleRepo.findAll();
		return sch;
	}
	
	


	@Override
	public boolean isScheduleExist(long scheduleId) {
		Optional<Schedule> sch = scheduleRepo.findById(scheduleId);
		if (sch.isPresent()) {
			return true;
		}
		return false;
	}
	
	


	@Override
	public Schedule getScheduleById(long scheduleId) {
		 Optional<Schedule> scheduleOptional = scheduleRepo.findById(scheduleId);
		 Schedule sch;
		  if (scheduleOptional.isPresent()) {
			     sch=   scheduleOptional.get();
			    } else {
			        throw new ResourceNotFoundException("Schedule", "scheduleId", scheduleId);
			    }
			    
			return sch;
			}
	
	
	@Override
	public boolean deleteSchedule(long scheduleId) {
		Optional<Schedule> sch = scheduleRepo.findById(scheduleId);
		if (sch.isPresent()) {
			scheduleRepo.deleteById(scheduleId);
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public boolean updateSchedule(Schedule schedule) {
		Optional<Schedule> sch = scheduleRepo.findById(schedule.getScheduleId());
		if (sch.isPresent()) {
			scheduleRepo.save(schedule);
			return true;
		} else {
			return false;
		}

}

	@Override
	public List<Schedule> getSchedulesByDoctorId(long doctorId) {
		return scheduleRepo.getSchedulesByDoctorId(doctorId);

	}
}

