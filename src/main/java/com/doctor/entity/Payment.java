package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "payment")
public class Payment {
	@Transient
    public static final String SEQUENCE_NAME = "payment_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long paymentId;
	private long doctorId;
	private long userId;
	private float amount;
	private long fromAccount;
	private long toAccount;
	private String paymentDate;

}
