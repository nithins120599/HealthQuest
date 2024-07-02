package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.Prescription;
@Service
public interface PrescriptionService {
	Prescription createPrescription(Prescription prescription);
	
	List<Prescription> getAllPrescription();
	boolean isPrescriptionExist(long prescriptionId);
	Prescription getPrescriptionById(long prescriptionId);
	boolean deletePrescription(long prescriptionId);
	boolean updatePrescription(Prescription prescription);
	
	 List<Prescription> findByAppId(long appId);
	 
	 
	 
	 List<Prescription> getPrescriptionsByAppId(long appId);
	 
	    boolean transferPrescriptions(long pharmacyId, List<String> prescriptions, long appId);
	    
	    List<Prescription> getPrescriptionsByPharmacyId(Long pharmacyId);



}
