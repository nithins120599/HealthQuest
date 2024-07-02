package com.doctor.repository;

import org.springframework.data.mongodb.repository.MongoRepository;


import com.doctor.entity.Reviews;

public interface ReviewsRepository extends MongoRepository<Reviews, Long>{

}
