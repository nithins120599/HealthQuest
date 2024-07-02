package com.doctor.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.entity.Doctor;
import com.doctor.entity.User;
import com.doctor.exception.ResourceNotFoundException;
import com.doctor.repository.UserRepository;

import com.doctor.service.UserService;
@Service
public class UserServiceImpl  implements UserService{
	@Autowired
    private UserRepository userRepo;

	@Override
	public void addUser(User user) {
		userRepo.save(user);
		
	}

	@Override
	public List<User> getAllUsers() {
		List<User> user=userRepo.findAll();
		return user;
	}
	

	@Override
	public boolean isUserExist(long userId) {
		Optional<User> user=userRepo.findById(userId);
		if (user.isPresent()) {
			return true;
		}
		return false;
	}
	
	
	@Override
	public User getUserById(long userId) {
		Optional<User> users = userRepo.findById(userId);
		User use;
		if (users.isPresent()) {
			use = users.get();
		} else {
			throw new ResourceNotFoundException("User", "userId", userId);
		}
		return use;
	}

	

	@Override
	public boolean deleteUser(long userId) {
		Optional<User> users = userRepo.findById(userId);
		if (users.isPresent()) {
			userRepo.deleteById(userId);
			return true;
		}else {
		return false;
	}
	}
	
	
	@Override
	public boolean updateUser(User user) {
		Optional<User> users = userRepo.findById(user.getUserId());
		if (users.isPresent()) {
			userRepo.save(user);
			return true;
		}else {
			return false;
		}
	}

	@Override
	public User findByMobilePassword(User user) {
		User use=userRepo.findByMobileAndPassword(user.getMobile(),user.getPassword());
		return use;
	}
	

}
