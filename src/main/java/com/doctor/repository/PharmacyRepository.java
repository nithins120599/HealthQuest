package com.doctor.repository;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.doctor.entity.Pharmacy;
import com.doctor.entity.User;

public interface PharmacyRepository extends MongoRepository<Pharmacy, Long>{
	 Pharmacy findByMobileAndPassword(String mobile, String password);

}
