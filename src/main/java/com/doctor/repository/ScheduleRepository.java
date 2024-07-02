package com.doctor.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.doctor.entity.Schedule;

public interface ScheduleRepository extends MongoRepository<Schedule, Long>{
	 List<Schedule> getSchedulesByDoctorId(long doctorId);

}
