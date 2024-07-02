package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "bankaccount")
public class BankAccount {
	@Transient
    public static final String SEQUENCE_NAME = "bankaccount_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	
	@Id
	private long id;

	private long userId;
	private long accountNumber;
	
	private long cardNumber;
	
	private String cardType;
	
	private String name;
	
	private int cvv;
	
	private String expiryDate;
	
	private float balanceAmount;


}
