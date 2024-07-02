package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "user")
public class User {
	@Transient
    public static final String SEQUENCE_NAME = "user_sequence";  //this name can be any
					//which we are using in EmployeeController
	
	@Id
	private long userId;
	private String name;
	private String email;
	private String gender;
	
	private String mobile;
	
	private String password;
	
	private String address;
	private String profilePic;
	

}
