package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.Medicine;

@Service
public interface MedicineService {
 void addMedicine(Medicine medicine);
 
 List<Medicine> getAllMedicines();
	boolean isMedicineExist(long medicineId);
	Medicine getMedicineById(long medicineId);
	boolean deleteMedicine(long medicineId);
	boolean updateMedicine(Medicine medicine);
}
