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

import com.doctor.entity.Doctor;
import com.doctor.entity.MedicalHistory;
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.DoctorService;
import com.doctor.service.MedicalHistoryService;

@RestController
@RequestMapping("/api/v2")
public class MedicalHistoryController {
	@Autowired
    private MedicalHistoryService medHistoryService;
	 
    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
    
    @PostMapping("/addMedicalHistory")
	public ResponseEntity<String> AddAppointment(@RequestBody MedicalHistory medicalhistory) {
		medicalhistory.setMedicalId(databaseaSequencesGeneratorService.generateSequence(MedicalHistory.SEQUENCE_NAME));
		medHistoryService.addMedicalHistory(medicalhistory);
        return ResponseEntity.status(HttpStatus.CREATED).body("MedicallhistoryService added successfully.");
	}
    
    @GetMapping("/allMedicalHistories")
	public ResponseEntity<List<MedicalHistory>> getAllMedicalHistory(){
		List<MedicalHistory> medHis = medHistoryService.getAllMedicalHistory();
		ResponseEntity<List<MedicalHistory>> entity = new ResponseEntity<>(medHis,HttpStatus.OK);
		return entity;
	}
    
    @GetMapping(value="/getMedicalHistory/{medicalId}")
   	public ResponseEntity<MedicalHistory> getEmployee(@PathVariable("medicalId") long medicalId){
   		
    	MedicalHistory medicalHistory=medHistoryService.getMedicalHistoryById(medicalId);
   		
   		if(medicalHistory !=null) {
   			return ResponseEntity.ok(medicalHistory);
   			
   		}else {
   			return ResponseEntity.notFound().build();
   		}
   		
   	}
    
    
    
    @DeleteMapping("/deleteMedicalHistory/{medicalId}")
	public ResponseEntity<Boolean> deleteProduct(@PathVariable("medicalId") long medicalId){
		
		boolean flag;
		if(medHistoryService.isMedicalHistoryExist(medicalId)){
			flag = medHistoryService.deleteMedicalHistory(medicalId);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag,HttpStatus.OK);
		
	}
    
    
    @PutMapping(value="/updateMedicalHistory/{medicalId}")
	public ResponseEntity<Boolean> updateEmployee(@PathVariable("medicalId") long medicalId, @RequestBody MedicalHistory medicalhistory)
	{
		
		boolean flag;
		if(medHistoryService.isMedicalHistoryExist(medicalId)){
			flag = medHistoryService.updateMedicalHistory(medicalhistory);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag, HttpStatus.OK);
		
	}
    
    
    @GetMapping("/medicalhistory/{userId}")
    public ResponseEntity<List<MedicalHistory>> getMedicalHistoryByUserId(@PathVariable int userId) {
        List<MedicalHistory> medicalHistory = medHistoryService.getMedicalHistoryByUserId(userId);
        return new ResponseEntity<>(medicalHistory, HttpStatus.OK);
    }
    
   
       
}
