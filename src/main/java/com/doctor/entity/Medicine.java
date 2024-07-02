package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "medicine")
public class Medicine {
	@Transient
    public static final String SEQUENCE_NAME = "medicine_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long medicineId;
	
	private String medicineName;
}
