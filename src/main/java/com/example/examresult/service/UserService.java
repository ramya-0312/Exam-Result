package com.example.examresult.service;

//package com.expensetracker.project.service;

//import com.expensetracker.project.entity.User;
//import com.expensetracker.project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.examresult.model.User;
import com.example.examresult.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public String registerUser(User user) {
		User existingUser = userRepository.findByEmail(user.getEmail());
		if (existingUser != null) {
			return "Email already registered";
		}
		userRepository.save(user);
		return "User registered successfully";
	}

	public String loginUser(User user) {
		User existingUser = userRepository.findByEmail(user.getEmail());
//        System.out.println(user.getEmail());
		if (existingUser == null) {
			return "no id found";
		}
		if (existingUser.getPassword().equals(user.getPassword())) {
			return "login succful";
		} else {
			return "mismatch";
		}
	}

}
