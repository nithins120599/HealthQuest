package com.doctor.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Admin;
import com.doctor.repository.AdminRepository;
import com.doctor.service.AdminService;


@Service
public class AdminServiceImpl implements AdminService{
	
	 @Autowired
	    private AdminRepository adminRepo;

	@Override
	public Admin createAdmin(Admin admin) {
		
		return adminRepo.save(admin);
		 
	}
/*
	@Override
	public Admin findByUserNameAndPassword(String userName, String password) {
		
		Admin admin= adminRepo.findByUserNameAndPassword(userName, password);
		return admin;

	}

*/
	
	@Override
	public boolean loginvalidate(Admin admin) {
		Admin admin1=adminRepo.findByUserNameAndPassword(admin.getUserName(),admin.getPassword());
		System.out.println("whatisthere in admin="+admin1);
		if(admin1==null)
			return false;
		else
			return true;
	}
}
