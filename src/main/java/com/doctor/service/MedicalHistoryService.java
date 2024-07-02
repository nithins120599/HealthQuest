package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.Doctor;
import com.doctor.entity.MedicalHistory;


@Service
public interface MedicalHistoryService {
	  void addMedicalHistory(MedicalHistory medicalHistory);
	  List<MedicalHistory> getAllMedicalHistory();
	   boolean isMedicalHistoryExist(long medicalId);
	   MedicalHistory getMedicalHistoryById(long medicalId);
	   boolean deleteMedicalHistory(long medicalId);
	   boolean updateMedicalHistory(MedicalHistory medicalHistory);
	   
	   List<MedicalHistory>getMedicalHistoryByUserId(int userId);
}
