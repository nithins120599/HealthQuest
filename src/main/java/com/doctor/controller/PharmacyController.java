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

import com.doctor.entity.Medicine;
import com.doctor.entity.Pharmacy;
import com.doctor.entity.User;
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.MedicineService;
import com.doctor.service.PharmacyService;

@RestController
@RequestMapping("/api/v2")
public class PharmacyController {
	@Autowired
    private PharmacyService pharmacyservice;
	 
    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
    
    @PostMapping("/AddPharmacy")
    public ResponseEntity<String> createSchedule(@RequestBody Pharmacy pharmacy) {
    	pharmacy.setPharmacyId(databaseaSequencesGeneratorService.generateSequence(Pharmacy.SEQUENCE_NAME));
    	pharmacyservice.addPharmacy(pharmacy);
        return ResponseEntity.status(HttpStatus.CREATED).body("Pharmacy added successfully.");
    }
    
    @GetMapping("/allPharmacies")
	public ResponseEntity<List<Pharmacy>> getAllPharmacy(){
		List<Pharmacy> pharmacy = pharmacyservice.getAllPharmacies();
		ResponseEntity<List<Pharmacy>> entity = new ResponseEntity<>(pharmacy,HttpStatus.OK);
		return entity;
	}
    
    
    @GetMapping(value="/getPharmacy/{pharmacyId}")
	public ResponseEntity<Pharmacy> sindhu1(@PathVariable("pharmacyId") long pharmacyId){
		
		Pharmacy doct=pharmacyservice.getPharmacyById(pharmacyId);
		
		if(doct !=null) {
			return ResponseEntity.ok(doct);
			
		}else {
			return ResponseEntity.notFound().build();
		}
		
	}
    
    @DeleteMapping("/deletePharmacy/{pharmacyId}")
	public ResponseEntity<Boolean> sindhu(@PathVariable("pharmacyId") long pharmacyId){
		
		boolean flag;
		if(pharmacyservice.isPharmacyExist(pharmacyId)){
			flag = pharmacyservice.deletePharmacy(pharmacyId);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag,HttpStatus.OK);
		
	}
    
    @PutMapping(value="/updatePharmacy/{pharmacyId}")
	public ResponseEntity<Boolean> sindhu3(@PathVariable("pharmacyId") long pharmacyId, @RequestBody Pharmacy pharmacy)
	{
		
		boolean flag;
		if(pharmacyservice.isPharmacyExist(pharmacyId)){
			flag = pharmacyservice.updatePharmacy(pharmacy);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag, HttpStatus.OK);
		
	}

    @PostMapping("/pharmacyValidation")
	public ResponseEntity<Pharmacy> pharmacyLogin(@RequestBody Pharmacy pharmacy) {

    	Pharmacy pharma = pharmacyservice.findByMobilePassword(pharmacy);
		return new ResponseEntity<>(pharma, HttpStatus.OK);
		
	}
    
}
