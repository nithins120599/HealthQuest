package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import org.springframework.data.mongodb.core.mapping.Document;


import lombok.Data;

@Data
@Document(collection = "doctor")
public class Doctor {
	@Transient
    public static final String SEQUENCE_NAME = "doctor_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long doctorId;
	private String doctorName;
	private String email;
	private String mobile;
	private String gender;
	private String certificateId;
	private String certificateFile;
	private String doctorPic;
	private String hospitalNo;
	private String hospitalName;
	private String hospitalPic;
	private String specialization;
	private String experience;
	private String location;
	private String status;
	private int consultantFee;
	private String password;
	private long doctorAccount;
	private  String registrationDate;

}
