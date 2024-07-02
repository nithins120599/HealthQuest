package com.doctor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doctor.entity.Admin;
import com.doctor.service.AdminService;




@RestController
@RequestMapping("/api/v2")
public class AdminController {
	@Autowired
    private AdminService adminServ;
	
	@PostMapping("createAdmin")
    public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin) {
        adminServ.createAdmin(admin);
        return new ResponseEntity<Admin>(admin,HttpStatus.CREATED);
    }
	
/*
	@GetMapping("/loginValidate/{userName}/{password}")
    public Admin loginValidate(@PathVariable("userName")String userName,@PathVariable("password")String password) {
	  Admin admin=adminServ.findByUserNameAndPassword(userName, password);
	  
        return admin;
    }
    
   */
	
	@PostMapping("/adminValidation")
	public ResponseEntity<Object> adminLogin(@RequestBody Admin admin) {

		boolean flag = adminServ.loginvalidate(admin);
		return new ResponseEntity<>(flag, HttpStatus.OK);
	}
  
}
	
	

