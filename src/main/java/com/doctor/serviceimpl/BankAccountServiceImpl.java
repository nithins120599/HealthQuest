package com.doctor.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.BankAccount;
import com.doctor.repository.BankAccountRepository;
import com.doctor.service.BankAccountService;

@Service
public class BankAccountServiceImpl implements BankAccountService{
	@Autowired
    private BankAccountRepository bankAccRepo;

	@Override
	public void addBankAccount(BankAccount bankAccount) {
		// TODO Auto-generated method stub
		bankAccRepo.save(bankAccount);
	}

	
	@Override
	public List<BankAccount> getBankAccountsByUserId(Long userId) {
		 return bankAccRepo.findByUserId(userId);
	}


	@Override
	public boolean updateBankAccount(BankAccount bankaccount) {
		if (isBankAccountExist(bankaccount.getId())) {
			bankAccRepo.save(bankaccount);
            return true;
        }
		return false;
		}


	

	@Override
	public boolean isBankAccountExist(long Id) {
		// TODO Auto-generated method stub
		return bankAccRepo.existsById(Id);
	}
	


}
