package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "appointment")
public class Appointment {
	@Transient
    public static final String SEQUENCE_NAME = "appointment_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long appId;
	private long userId;
	private long doctorId;
	private String appStatus;
	private String appTime;
	private String appDate;
	private String bookDate;
	private String symptoms;
	private int weight;
	private int age;
	


	
}
