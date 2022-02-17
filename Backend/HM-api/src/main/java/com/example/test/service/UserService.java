package com.example.test.service;

import java.util.ArrayList;
import java.util.List;
//import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.test.Repository.UserRepository;
import com.example.test.model.Cart;
import com.example.test.model.Order;
import com.example.test.model.User;

@Service
public class UserService {
	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User adduser(User user) {
		List<Cart> cart=new ArrayList<Cart>();
		user.setCart(cart);		
		List<Order> order=new ArrayList<Order>();
		user.setOrder(order);
		return userRepository.insert(user);
	}

	public User updateUser(User user) {
		User savedUser = userRepository.findById(user.getId()).orElseThrow(
				() -> new RuntimeException(String.format("Cannot Find User by ID %s", user.getId())));
		savedUser.setUserName(user.getUserName());
		savedUser.setUserEmail(user.getUserEmail());
		savedUser.setUserPhone(user.getUserPhone());
		savedUser.setUserPassword(user.getUserPassword());
		if (user.getCart()==null) {
			List<Cart> cart=new ArrayList<Cart>();
			savedUser.setCart(cart);
		}else {
		savedUser.setCart(user.getCart());
		}
		savedUser.setOrder(user.getOrder());
		
		userRepository.save(user);
		return savedUser;
	}

	public List<User> getAllUser() {
		return userRepository.findAll();
	}
	
	public User getUserById(String id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new RuntimeException(String.format("Cannot Find User by ID - %s", id)));
	}

	public User getUser(String name) {
		return userRepository.findByName(name)
				.orElseThrow(() -> new RuntimeException(String.format("Cannot Find User by Name - %s", name)));
	}

	public void deleteUser(String id) {
		userRepository.deleteById(id);
	}
	
	
}
