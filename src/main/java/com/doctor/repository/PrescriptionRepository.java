package com.doctor.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doctor.entity.Pharmacy;
import com.doctor.entity.Prescription;

public interface PrescriptionRepository extends MongoRepository<Prescription, Long>{
	 List<Prescription> findByAppId(long appId);
	 
	 List<Prescription> findByPharmacyId(long pharmacyId);

}
