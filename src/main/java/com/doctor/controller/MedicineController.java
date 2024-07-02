package com.doctor.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.doctor.entity.Medicine;
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.MedicineService;

@RestController
@RequestMapping("/api/v2")
public class MedicineController {

    @Autowired
    private MedicineService medicineServ;

    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;

    @PostMapping("/AddMedicine")
    public ResponseEntity<String> createSchedule(@RequestBody Medicine medicine) {
        medicine.setMedicineId(databaseaSequencesGeneratorService.generateSequence(Medicine.SEQUENCE_NAME));
        medicineServ.addMedicine(medicine);
        return ResponseEntity.status(HttpStatus.CREATED).body("Medicine added successfully.");
    }

    @GetMapping("/allMedecines")
    public ResponseEntity<List<Medicine>> getAllMedicines(@RequestParam(value = "search", required = false) String search) {
        List<Medicine> medicines = medicineServ.getAllMedicines();
        if (search != null && !search.isEmpty()) {
            medicines = medicines.stream()
                .filter(medicine -> medicine.getMedicineName().toLowerCase().contains(search.toLowerCase()))
                .collect(Collectors.toList());
        }
        return new ResponseEntity<>(medicines, HttpStatus.OK);
    }

    @GetMapping(value = "/getMedicine/{medicineId}")
    public ResponseEntity<Medicine> getMedecine(@PathVariable("medicineId") long medicineId) {
        Medicine med = medicineServ.getMedicineById(medicineId);
        if (med != null) {
            return ResponseEntity.ok(med);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteMedicine/{medicineId}")
    public ResponseEntity<Boolean> deleteMedicine(@PathVariable("medicineId") long medicineId) {
        boolean flag;
        if (medicineServ.isMedicineExist(medicineId)) {
            flag = medicineServ.deleteMedicine(medicineId);
        } else {
            flag = false;
        }
        return new ResponseEntity<>(flag, HttpStatus.OK);
    }

    @PutMapping(value = "/updateMedicine/{medicineId}")
    public ResponseEntity<Boolean> updateMedicine(@PathVariable("medicineId") long medicineId, @RequestBody Medicine medicine) {
        boolean flag;
        if (medicineServ.isMedicineExist(medicineId)) {
            flag = medicineServ.updateMedicine(medicine);
        } else {
            flag = false;
        }
        return new ResponseEntity<>(flag, HttpStatus.OK);
    }
}
