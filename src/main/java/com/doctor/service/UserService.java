package com.doctor.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;


import com.doctor.entity.User;

@Service
public interface UserService {
void addUser(User user);
List<User> getAllUsers();
boolean isUserExist(long userId);
User getUserById(long userId);
boolean deleteUser(long userId);
boolean updateUser(User user);

User findByMobilePassword(User user);

//Optional<User> getUserById(long userId);
}
