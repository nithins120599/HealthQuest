package com.doctor.controller;

import java.util.List;
import java.util.Optional;

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
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.DoctorService;

@RestController
@RequestMapping("/api/v2")
public class DoctorController{
	@Autowired
    private DoctorService doctorServ;
	 
    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;

    @PostMapping("/createDoctor")
    public ResponseEntity<String> createDoctor(@RequestBody Doctor doctor) {
        doctor.setDoctorId(databaseaSequencesGeneratorService.generateSequence(Doctor.SEQUENCE_NAME));
        doctorServ.addDoctor(doctor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Doctor added successfully.");
    }
   
    @GetMapping("/allDoctors")
	public ResponseEntity<List<Doctor>> getAllDoctors(){
		List<Doctor> doctor = doctorServ.getAllDoctors();
		ResponseEntity<List<Doctor>> entity = new ResponseEntity<>(doctor,HttpStatus.OK);
		return entity;
	}
    /*
    @GetMapping(value="/getDoctor/{doctorId}")
	public ResponseEntity<Doctor> getEmployee(@PathVariable("doctorId") long doctorId){
		
		Doctor doct=doctorServ.getDoctorById(doctorId);
		
		if(doct !=null) {
			return ResponseEntity.ok(doct);
			
		}else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	*/
    
    @GetMapping("getDoctorById/{doctorId}")
    public Optional<Doctor> getDoctorById(@PathVariable("doctorId") long doctorId) {
        return doctorServ.getDoctorById(doctorId);
    }

    
    
    @DeleteMapping("/deleteDoctor/{doctorId}")
	public ResponseEntity<Boolean> deleteProduct(@PathVariable("doctorId") long doctorId){
		
		boolean flag;
		if(doctorServ.isDoctorExist(doctorId)){
			flag = doctorServ.deleteDoctor(doctorId);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag,HttpStatus.OK);
		
	}
    
    @PutMapping(value="/updateDoctor/{doctorId}")
	public ResponseEntity<Boolean> updateEmployee(@PathVariable("doctorId") long doctorId, @RequestBody Doctor doctor)
	{
	boolean flag;
		if(doctorServ.isDoctorExist(doctorId)){
			flag = doctorServ.updateDoctor(doctor);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag, HttpStatus.OK);
	}
    
    
    @PutMapping("/updateStatus/{doctorId}/{status}")
    public ResponseEntity<Boolean> updateDoctorStatus(@PathVariable long doctorId, @PathVariable String status) {
        try {
            boolean updated = doctorServ.updateStatusByDoctorId(doctorId, status);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
    
   
    @PostMapping("/doctorValidation")
	public ResponseEntity<Doctor> doctorLogin(@RequestBody Doctor doctor) {

		Doctor docto = doctorServ.findByEmailPassword(doctor);
		return new ResponseEntity<>(docto, HttpStatus.OK);
		
	}
    
    @GetMapping("/getAllSpecializations")
    public ResponseEntity<List<String>> getAllSpecializations() {
        List<String> specializations = doctorServ.findAllSpecializations();
        return new ResponseEntity<>(specializations, HttpStatus.OK);
    }

    @GetMapping("/getAllLocations")
    public ResponseEntity<List<String>> getAllLocations() {
        List<String> locations = doctorServ.findAllLocations();
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }
   
    
    @GetMapping("/getDoctorsBySpecializationAndLocation/{specialization}/{location}")
    public List<Doctor> getDoctorsBySpecializationAndLocation(@PathVariable String specialization, @PathVariable String location) {
        List<Doctor> doctors = doctorServ.getDoctorsBySpecializationAndLocation(specialization, location);
        // Iterate through the list of doctors and fetch detailed information including consultation fee
        for (Doctor doctor : doctors) {
            // Fetch detailed doctor information using the doctorId
            Optional<Doctor> optionalDoctor = doctorServ.getDoctorById(doctor.getDoctorId());
            if (optionalDoctor.isPresent()) {
                // Update the doctor object with detailed information
                Doctor detailedDoctor = optionalDoctor.get();
                doctor.setConsultantFee(detailedDoctor.getConsultantFee());
          
                // You can include other details here if needed
            }
        }
        return doctors;
    }

}
