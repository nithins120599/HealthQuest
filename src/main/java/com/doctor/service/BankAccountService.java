package com.doctor.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.doctor.entity.BankAccount;
import com.doctor.entity.Doctor;

@Service
public interface BankAccountService {
	 void addBankAccount(BankAccount bankAccount);
	 
	 List<BankAccount> getBankAccountsByUserId(Long userId);
	  boolean isBankAccountExist(long id);

	 boolean updateBankAccount(BankAccount bankaccount);
}
