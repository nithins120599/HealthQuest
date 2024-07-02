package com.doctor.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doctor.entity.MedicalHistory;

public interface MedicalHistoryRepository extends MongoRepository<MedicalHistory, Long>{
	List<MedicalHistory>findByUserId(int userId);

}
