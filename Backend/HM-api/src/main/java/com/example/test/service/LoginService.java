package com.example.test.service;

import org.springframework.stereotype.Service;

import com.example.test.Repository.UserRepository;
import com.example.test.model.User;

@Service
public class LoginService {
	private final UserRepository userRepository;

	public LoginService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	public User findByEmail(String userEmail) {
		
		return userRepository.findByUserEmail(userEmail)
				.orElse(new User());
	}

}
