package com.doctor.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doctor.entity.Doctor;

import com.doctor.entity.User;

public interface UserRepository extends MongoRepository<User, Long>{
	 User findByMobileAndPassword(String mobile, String password);
	// Optional<User> getUserById(long userId);
}
