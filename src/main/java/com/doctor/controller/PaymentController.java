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
import com.doctor.entity.Payment;
import com.doctor.service.AppointmentService;
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.PaymentService;

@RestController
@RequestMapping("/api/v2")
public class PaymentController {
	@Autowired
    private PaymentService paymentService;
	 
    @Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
    
    @PostMapping("/addPayment")
    public ResponseEntity<String> createDoctor(@RequestBody Payment payment) {
    	payment.setPaymentId(databaseaSequencesGeneratorService.generateSequence(Payment.SEQUENCE_NAME));
    	paymentService.addPayment(payment);
        return ResponseEntity.status(HttpStatus.CREATED).body("Payment added successfully.");
    }
   
    
    @GetMapping("/allPayments")
	public ResponseEntity<List<Payment>> getAllPayments(){
		List<Payment> payment = paymentService.getAllPayment();
		ResponseEntity<List<Payment>> entity = new ResponseEntity<>(payment,HttpStatus.OK);
		return entity;
	}
	
	@GetMapping(value="/getPayment/{paymentId}")
	public ResponseEntity<Payment> getEmployee(@PathVariable("paymentId") long paymentId){
		
		Payment pay=paymentService.getPaymentById(paymentId);
		
		if(pay !=null) {
			return ResponseEntity.ok(pay);
			
		}else {
			return ResponseEntity.notFound().build();
		}
		
	}
	
	@DeleteMapping("/deletePayment/{paymentId}")
	public ResponseEntity<Boolean> deletePayments(@PathVariable("paymentId") long paymentId){
		
		boolean flag;
		if(paymentService.isPaymentExist(paymentId)){
			flag = paymentService.deletePayment(paymentId);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag,HttpStatus.OK);
		
	}
	
	
	@PutMapping(value="/updatePayment/{paymentId}")
	public ResponseEntity<Boolean> updatePayments(@PathVariable("paymentId") long paymentId, @RequestBody Payment payment)
	{
	
		boolean flag;
		if(paymentService.isPaymentExist(paymentId)){
			flag = paymentService.updatePayment(payment);
		}else {
			flag = false;
		}
		
		return new ResponseEntity<>(flag, HttpStatus.OK);
		
	}
    
}
