package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "pharmacy")
public class Pharmacy {
	@Transient
    public static final String SEQUENCE_NAME = "pharmacy_sequence";  //this name can be any
					//which we are using in EmployeeController
	@Id
	private long pharmacyId;
	private String pharmacyName;
	private long shopRegNo;
	private String location;
	private String mobile;
	private String password;
	private String email;
	private String pharmacyPic;
}
