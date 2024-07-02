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
import com.doctor.entity.Schedule;
import com.doctor.entity.User;
import com.doctor.service.DatabaseaSequencesGeneratorService;
import com.doctor.service.ScheduleService;
import com.doctor.service.UserService;

@RestController
@RequestMapping("/api/v2")
public class UserController {
	@Autowired
    private UserService userServ;
	
	@Autowired
    private DatabaseaSequencesGeneratorService databaseaSequencesGeneratorService;
	
	 @PostMapping("/AddUsers")
	    public ResponseEntity<String> createSchedule(@RequestBody User user) {
		 user.setUserId(databaseaSequencesGeneratorService.generateSequence(User.SEQUENCE_NAME));
		 userServ.addUser(user);
	        return ResponseEntity.status(HttpStatus.CREATED).body("User added successfully.");
	    }
	 
	 @GetMapping("/allUsers")
		public ResponseEntity<List<User>> getAllUsers(){
			List<User> user = userServ.getAllUsers();
			ResponseEntity<List<User>> entity = new ResponseEntity<>(user,HttpStatus.OK);
			return entity;
		}
	 
	  @GetMapping(value="/getUser/{userId}")
		public ResponseEntity<User> getUser(@PathVariable("userId") long userId){
			
		  User userr=userServ.getUserById(userId);
			
			if(userr !=null) {
				return ResponseEntity.ok(userr);
				
			}else {
				return ResponseEntity.notFound().build();
			}
			
		}

	  
	  
	    @DeleteMapping("/deleteUser/{userId}")
		public ResponseEntity<Boolean> deleteProduct(@PathVariable("userId") long userId){
			
			boolean flag;
			if(userServ.isUserExist(userId)){
				flag = userServ.deleteUser(userId);
			}else {
				flag = false;
			}
			
			return new ResponseEntity<>(flag,HttpStatus.OK);
			
		}
	    
	    

	    @PutMapping(value="/updateUser/{userId}")
		public ResponseEntity<Boolean> updateEmployee(@PathVariable("userId") long userId, @RequestBody User user)
		{
			
			boolean flag;
			if(userServ.isUserExist(userId)){
				flag = userServ.updateUser(user);
			}else {
				flag = false;
			}
			
			return new ResponseEntity<>(flag, HttpStatus.OK);
			
		}
	    
	    @PostMapping("/userValidation")
		public ResponseEntity<User> doctorLogin(@RequestBody User user) {

	    	User users = userServ.findByMobilePassword(user);
			return new ResponseEntity<>(users, HttpStatus.OK);
			
		}
	    
	    
	   
}
