package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "reviews")
public class Reviews {
	@Transient
    public static final String SEQUENCE_NAME = "reviews_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long reviewId;
	private long doctorId;
	private long userId;
	private int rating;
	private String review;

}
