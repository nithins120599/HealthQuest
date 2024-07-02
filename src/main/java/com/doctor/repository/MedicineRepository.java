package com.doctor.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doctor.entity.Medicine;


public interface MedicineRepository extends MongoRepository<Medicine, Long>{

}
