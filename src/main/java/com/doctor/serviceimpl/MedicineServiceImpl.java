package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Medicine;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.MedicineRepository;

import com.doctor.service.MedicineService;
@Service
public class MedicineServiceImpl implements MedicineService{
	@Autowired
    private MedicineRepository medicineRepo;

	public void addMedicine(Medicine medicine) {
		medicineRepo.save(medicine);
		
	}

	@Override
	public List<Medicine> getAllMedicines() {
		List<Medicine> med =medicineRepo.findAll();
		return med;
	}
	
	@Override
	public boolean isMedicineExist(long medicineId) {
		Optional<Medicine> med = medicineRepo.findById(medicineId);
		if (med.isPresent()) {
			return true;
		}
		return false;
	}

	@Override
	public Medicine getMedicineById(long medicineId) {
		Optional<Medicine> medicine = medicineRepo.findById(medicineId);
		Medicine med;
		 if (medicine.isPresent()) {
		     med=   medicine.get();
		    } else {
		        throw new ResourceNotFoundException("Medicine", "medicineId", medicineId);
		    }
		    
		return med;
		}
	
	@Override
	public boolean deleteMedicine(long medicineId) {
		Optional<Medicine> med = medicineRepo.findById(medicineId);
		if (med.isPresent()) {
			medicineRepo.deleteById(medicineId);
			return true;
		} else {
			return false;
		}
	}
	
	
	@Override
	public boolean updateMedicine(Medicine medicine) {
		Optional<Medicine> med = medicineRepo.findById(medicine.getMedicineId());
		if (med.isPresent()) {
			medicineRepo.save(medicine);
			return true;
		} else {
			return false;
		}
	}
	
	
}
