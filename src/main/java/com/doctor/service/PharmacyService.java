package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.Medicine;
import com.doctor.entity.Pharmacy;
import com.doctor.entity.User;

@Service
public interface PharmacyService {
	 void addPharmacy(Pharmacy pharmacy);
	 List<Pharmacy> getAllPharmacies();
		boolean isPharmacyExist(long pharmacyId);
		Pharmacy getPharmacyById(long pharmacyId);
		boolean deletePharmacy(long pharmacyId);
		boolean updatePharmacy(Pharmacy pharmacy);
		
		Pharmacy findByMobilePassword(Pharmacy pharmacy);
}
