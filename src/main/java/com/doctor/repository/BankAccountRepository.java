package com.doctor.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doctor.entity.Appointment;
import com.doctor.entity.BankAccount;

public interface BankAccountRepository extends MongoRepository<BankAccount, Long>{
	List<BankAccount> findByUserId(Long userId);
}
