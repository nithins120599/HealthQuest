package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "prescription")
public class Prescription {
	@Transient
    public static final String SEQUENCE_NAME = "prescription_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long prescriptionId;
	private long appId;
	private String prescription;
	private String prescriptionDate;
	private long pharmacyId;
	
}
