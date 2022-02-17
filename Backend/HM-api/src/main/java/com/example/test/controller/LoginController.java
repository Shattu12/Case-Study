package com.example.test.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.model.User;
import com.example.test.service.LoginService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class LoginController {
	private final LoginService loginService;
	public LoginController(LoginService loginService) {
		this.loginService = loginService;
	}
	@PostMapping("/login")
    public ResponseEntity<Object> authUser(@RequestBody User user) {
		
		String Email=user.getUserEmail();
		User userdtls= loginService.findByEmail(Email);
		System.out.println(userdtls);
		System.out.println(user);
		if(user.getUserPassword()!= null) 
		{
			String Pass=user.getUserPassword();
			if( userdtls.getUserPassword().equals(Pass)) {
				return new ResponseEntity<Object>(userdtls,HttpStatus.OK);
			}
		}
		return new ResponseEntity<Object>("Not Found !",HttpStatus.BAD_REQUEST);	
       
    }
	
}
