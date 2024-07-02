package com.doctor.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.doctor.entity.Admin;


@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
	
	Admin findByUserNameAndPassword(String userName, String password);
	
	

}
