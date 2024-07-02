package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.Medicine;
import com.doctor.entity.Payment;
@Service
public interface PaymentService {
	 void addPayment(Payment payment);
	 
	 List<Payment> getAllPayment();
		boolean isPaymentExist(long paymentId);
		Payment getPaymentById(long paymentId);
		boolean deletePayment(long paymentId);
		boolean updatePayment(Payment payment);
}
