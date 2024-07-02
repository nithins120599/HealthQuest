package com.doctor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doctor.entity.Pharmacy;
import com.doctor.entity.Prescription;
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.MedicalHistoryService;
import com.doctor.service.PrescriptionService;

@RestController
@RequestMapping("/api/v2")
public class PrescriptionController {
	@Autowired
    private PrescriptionService preService;
	 
    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
    
   /* 
    @PostMapping("/AddPrescription")
    public ResponseEntity<String> createSchedule(@RequestBody Prescription prescription) {
    	prescription.setPrescriptionId(databaseaSequencesGeneratorService.generateSequence(Prescription.SEQUENCE_NAME));
    	preService.addPrescription(prescription);
        return ResponseEntity.status(HttpStatus.CREATED).body("Prescription added successfully.");
    }
    
    */
    
    
    @PostMapping("/addPrescriptions")
    public ResponseEntity<List<Prescription>> createPrescriptions(@RequestBody List<Prescription> prescriptions) {
        prescriptions.forEach(prescription -> {
            prescription.setPrescriptionId(databaseaSequencesGeneratorService.generateSequence(Prescription.SEQUENCE_NAME));
            preService.createPrescription(prescription);
        });
        return new ResponseEntity<>(prescriptions, HttpStatus.CREATED);
    }
    
    
    @GetMapping("/allPrescription")
	public ResponseEntity<List<Prescription>> getAllPrescription(){
		List<Prescription> doctor = preService.getAllPrescription();
		ResponseEntity<List<Prescription>> entity = new ResponseEntity<>(doctor,HttpStatus.OK);
		return entity;
	}
	
	@GetMapping(value="/getPrescription/{prescriptionId}")
	public ResponseEntity<Prescription> getPrescription(@PathVariable("prescriptionId") long prescriptionId){
		
		Prescription doct=preService.getPrescriptionById(prescriptionId);
		
		if(doct !=null) {
			return ResponseEntity.ok(doct);
			
		}else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@DeleteMapping("/deleteprescription/{prescriptionId}")
	public ResponseEntity<Boolean> deleteAppointment(@PathVariable("prescriptionId") long prescriptionId){
		
		boolean flag;
		if(preService.isPrescriptionExist(prescriptionId)){
			flag = preService.deletePrescription(prescriptionId);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag,HttpStatus.OK);
		
	}
	@PutMapping(value="/updatePrescription/{prescriptionId}")
	public ResponseEntity<Boolean> updateAppointment(@PathVariable("prescriptionId") long prescriptionId, @RequestBody Prescription prescription)
	{
		
		boolean flag;
		if(preService.isPrescriptionExist(prescriptionId)){
			flag = preService.updatePrescription(prescription);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag, HttpStatus.OK);
		
	}
	
	@GetMapping("/prescriptions/appointments/{appId}")
    public List<Prescription> getPrescriptionsByUserId(@PathVariable long appId) {
        return preService.findByAppId(appId);
    }

	@GetMapping("/prescriptions/{pharmacyId}")
    public List<Prescription> getPrescriptionsByPharmacyId(@PathVariable Long pharmacyId) {
		 return preService.getPrescriptionsByPharmacyId(pharmacyId);

}
    
}
