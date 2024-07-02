package com.doctor.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "schedule")

public class Schedule {
	@Transient
	public static final String SEQUENCE_NAME = "schedule_sequence";
	
	@Id
	private long scheduleId;

	private long doctorId;

	private String day;

	private String timings;

	
	
	private String status;


}
