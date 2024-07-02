package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
@Data
@Document(collection = "admin")
public class Admin {
	@Id
	@NotBlank
	@Size(max = 50)
	@Indexed(unique = true)
	private String userName;
	
	@NotBlank
	@Size(max = 20)
	@Indexed(unique = true)
	private String password;

}
