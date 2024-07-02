package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Doctor;
import com.doctor.entity.MedicalHistory;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.DoctorRepository;
import com.doctor.repository.MedicalHistoryRepository;
import com.doctor.service.MedicalHistoryService;

@Service
public class MedicalHistoryServiceImpl implements MedicalHistoryService{
	@Autowired
    private MedicalHistoryRepository medicalHistoryRepo;

	@Override
	public void addMedicalHistory(MedicalHistory medicalHistory) {
		// TODO Auto-generated method stub
		medicalHistoryRepo.save(medicalHistory);
	}

	@Override
	public List<MedicalHistory> getAllMedicalHistory() {
		List<MedicalHistory> medHis = medicalHistoryRepo.findAll();
		return medHis;
	}
	

	@Override
	public boolean isMedicalHistoryExist(long medicalId) {
		Optional<MedicalHistory> medHistory=medicalHistoryRepo.findById(medicalId);
		if (medHistory.isPresent()) {
			return true;
		}
		return false;
	}
	
	
	

	@Override
	public MedicalHistory getMedicalHistoryById(long medicalId) {
		Optional<MedicalHistory> medHist=medicalHistoryRepo.findById(medicalId);
		MedicalHistory medicalHistory;
		if (medHist.isPresent()) {
			medicalHistory=medHist.get();
		}else {
			throw new ResourceNotFoundException("MedicalHistory", "medicalId", medicalId);
		}
		return medicalHistory;
	}
	
	

	@Override
	public boolean deleteMedicalHistory(long medicalId) {
		Optional<MedicalHistory> medHistory=medicalHistoryRepo.findById(medicalId);
		if (medHistory.isPresent()) {
			medicalHistoryRepo.deleteById(medicalId);
			return true;

		}else {
		return false;
	}
	}
	

	@Override
	public boolean updateMedicalHistory(MedicalHistory medicalHistory) {
		Optional<MedicalHistory> medHistory=medicalHistoryRepo.findById(medicalHistory.getMedicalId());
		if (medHistory.isPresent()) {
			medicalHistoryRepo.save(medicalHistory);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<MedicalHistory> getMedicalHistoryByUserId(int userId) {
		// TODO Auto-generated method stub
		return medicalHistoryRepo.findByUserId(userId) ;
	}
	
	
}
