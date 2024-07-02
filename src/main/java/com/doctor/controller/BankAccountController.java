package com.doctor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doctor.entity.BankAccount;
import com.doctor.entity.Doctor;
import com.doctor.service.AppointmentService;
import com.doctor.service.BankAccountService;
import com.doctor.service.DatabaseaSequencesGeneratorService;

@RestController
@RequestMapping("/api/v2")
public class BankAccountController {
	@Autowired
    private BankAccountService bankAccService;
	 
    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
    
    @PostMapping("/addBankAccounts")
    public ResponseEntity<String> createDoctor(@RequestBody BankAccount bankAccount) {
    	bankAccount.setId(databaseaSequencesGeneratorService.generateSequence(BankAccount.SEQUENCE_NAME));
    	bankAccService.addBankAccount(bankAccount);
        return ResponseEntity.status(HttpStatus.CREATED).body("BankAccounts added successfully.");
        
    }
    
    
    @GetMapping("/accounts/user/{userId}")
    public List<BankAccount> getBankAccountsByUserId(@PathVariable Long userId) {
        return bankAccService.getBankAccountsByUserId(userId);
    }
    
    
    @PutMapping(value = "/updateBankAccount/{Id}")
    public ResponseEntity<Object> updatebankaccount(@PathVariable("Id") long Id, @RequestBody BankAccount bankaccount) {
        boolean updated = bankAccService.updateBankAccount(bankaccount);
        if (updated) {
            return new ResponseEntity<>("BankAccount updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("BankAccount not found", HttpStatus.NOT_FOUND);
        }
    }
    

    
    
}
