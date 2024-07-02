package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Payment;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.MedicineRepository;
import com.doctor.repository.PaymentRepository;
import com.doctor.service.PaymentService;
@Service
public class PaymentServiceImpl implements PaymentService{
	@Autowired
    private PaymentRepository payRepo;

	@Override
	public void addPayment(Payment payment) {
		// TODO Auto-generated method stub
		payRepo.save(payment);
	}

	@Override
	public List<Payment> getAllPayment() {
		List<Payment> doc=payRepo.findAll();
		return doc;
	}

	@Override
	public boolean isPaymentExist(long paymentId) {
		Optional<Payment> pay = payRepo.findById(paymentId);
		if (pay.isPresent()) {
			return true;
		}
		return false;
	}
	
	
	@Override
	public Payment getPaymentById(long paymentId) {
		Optional<Payment> payment = payRepo.findById(paymentId);
		Payment pay;
		if (payment.isPresent()) {
			pay = payment.get();
		} else {
			throw new ResourceNotFoundException("Payment", "paymentId", paymentId);
		}
		return pay;
	}
	
	@Override
	public boolean deletePayment(long paymentId) {
		Optional<Payment> payme = payRepo.findById(paymentId);
		if (payme.isPresent()) {
			payRepo.deleteById(paymentId);
			return true;
		} else {
			return false;
		}
	}


	@Override
	public boolean updatePayment(Payment payment) {
		Optional<Payment> payments = payRepo.findById(payment.getPaymentId());
		if (payments.isPresent()) {
			payRepo.save(payment);
			return true;
		} else {
			return false;
		}
	}
}
