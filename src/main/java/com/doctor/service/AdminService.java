package com.doctor.service;

import org.springframework.stereotype.Service;

import com.doctor.entity.Admin;
@Service
public interface AdminService {
	 Admin createAdmin(Admin admin);
	 
	/*Admin findByUserNameAndPassword(String userName, String password); */
	
	boolean loginvalidate(Admin admin);

}
