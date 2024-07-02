package com.doctor.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doctor.entity.Payment;
import com.doctor.entity.Pharmacy;

public interface PaymentRepository extends MongoRepository<Payment, Long>{

}
