package com.example.examresult.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.examresult.model.User;
import com.example.examresult.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class usercontroller {

	@Autowired
	private UserService userService;

	// Signup endpoint
	@PostMapping("/adduser")
	public ResponseEntity<Map<String, Object>> userregister(@RequestBody User user) {
		Map<String, Object> res = new HashMap<>();

		try {
			String response = userService.registerUser(user);
			res.put("status", HttpStatus.OK);
			res.put("response", response);
		} catch (Exception e) {
			res.put("status", HttpStatus.BAD_REQUEST);
			res.put("message", e.getMessage());

		}
		return new ResponseEntity<Map<String, Object>>(res, (HttpStatusCode) res.get("status"));
	}

	// Google Login endpoint returning a HashMap response
	@PostMapping("/login/google")
	public ResponseEntity<Map<String, Object>> loginWithGoogle(@RequestBody User user) {
		Map<String, Object> res = new HashMap<>();

		try {
			String response = userService.loginUser(user);
			res.put("status", HttpStatus.OK);
			res.put("response", response);
		} catch (Exception e) {
			res.put("status", HttpStatus.BAD_REQUEST);
			res.put("message", e.getMessage());

		}
		return new ResponseEntity<Map<String, Object>>(res, (HttpStatusCode) res.get("status"));
	}

	// Email/password login endpoint
	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody User user) {
		String message = userService.loginUser(user);
		if (message.equals("Login successful!")) {
			return ResponseEntity.ok(message);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(message);
		}
	}
}