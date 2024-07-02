package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "medicalhistory")
public class MedicalHistory {
	@Transient
    public static final String SEQUENCE_NAME = "medicalhistory_sequence";  //this name can be any
					//which we are using in EmployeeController

	@Id
	private long medicalId;
	private long userId;
	private String allergy;
	private String medicalHistory;
	
}
