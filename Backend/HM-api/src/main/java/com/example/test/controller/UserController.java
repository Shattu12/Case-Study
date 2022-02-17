package com.example.test.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.test.model.Cart;
import com.example.test.model.Item;
import com.example.test.model.Order;
import com.example.test.model.User;
import com.example.test.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {
	private final UserService userService;

	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/add")
	public ResponseEntity<Object> addUser(@RequestBody User user) {
		// userService.adduser(user);
		return new ResponseEntity<Object>(userService.adduser(user), HttpStatus.CREATED);
	}

	@PutMapping("/update")
	public ResponseEntity<Object> updateUser(@RequestBody User user) {
		User UpdatedUser = userService.updateUser(user);
		return new ResponseEntity<Object>(UpdatedUser, HttpStatus.OK);
	}

	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllUser() {
		return ResponseEntity.ok(userService.getAllUser());
	}

	@GetMapping("/{name}")
	public ResponseEntity<User> getUserByName(@PathVariable String name) {
		return ResponseEntity.ok(userService.getUser(name));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteUser(@PathVariable String id) {
		userService.deleteUser(id);
		return new ResponseEntity<Object>("success", HttpStatus.OK);
	}

	@GetMapping("/cart/{id}")
	public ResponseEntity<List<Cart>> getCartByUserId(@PathVariable String id) {
		System.out.println(id);
		List<Cart> NotOrderd = userService.getUserById(id).getCart();
		for (Cart cart : NotOrderd) {
			System.out.println(cart);
			if (cart.getStatus().equalsIgnoreCase("Payment Done")) {
				NotOrderd.remove(cart);
			} else {
				// System.out.println(cart.getStatus());
			}
		}
		// return ResponseEntity.ok(userService.getUserById(id).getCart());
		return ResponseEntity.ok(NotOrderd);
	}

	@PutMapping("/cart/add/{id}")
	public ResponseEntity<Object> addToCart(@PathVariable String id, @RequestBody Item NewItem) {
		User userDetails = userService.getUserById(id);
		List<Cart> ExistingCart = userDetails.getCart();
		// System.out.println(id);
		// System.out.println(NewItem);
		// System.out.println(ExistingCart);

		if (ExistingCart.isEmpty()) {
			Cart NewCartItem = new Cart();
			NewCartItem.setId(NewItem.getId());
			NewCartItem.setItem(NewItem);
			NewCartItem.setQuantity(1);
			NewCartItem.setTotalPrice(NewItem.getItemPrice());
			NewCartItem.setStatus("Added To Cart");
			userDetails.getCart().add(NewCartItem);
		} else {
			boolean IsExist = false;
			for (Cart cart : ExistingCart) {
				String ItemId = cart.getId();
				// String status = cart.getStatus();
				// System.out.println("> " + ItemId);
				if (ItemId.equals(NewItem.getId())) {
					IsExist = true;
					int quantity = cart.getQuantity() + 1;
					cart.setQuantity(quantity);
					cart.setTotalPrice((int) cart.getItem().getItemPrice() * quantity);
					cart.setStatus("Added To Cart");
				}
			}
			if (!IsExist) {
				Cart NewCartItem = new Cart();
				NewCartItem.setId(NewItem.getId());
				NewCartItem.setItem(NewItem);
				NewCartItem.setQuantity(1);
				NewCartItem.setTotalPrice(NewItem.getItemPrice());
				NewCartItem.setStatus("Added To Cart");
				userDetails.getCart().add(NewCartItem);
			}
		}
		User UpdatedUser = userService.updateUser(userDetails);
		return new ResponseEntity<Object>(UpdatedUser.getCart(), HttpStatus.OK);
	}

	@PutMapping("/cart/remove/{id}")
	public ResponseEntity<Object> removeFromCart(@PathVariable String id, @RequestBody Item NewItem) {
		User userDetails = userService.getUserById(id);
		List<Cart> ExistingCart = userDetails.getCart();

		if (!ExistingCart.isEmpty()) {
			for (Cart cart : ExistingCart) {
				String ItemId = cart.getId();
				if (ItemId.equals(NewItem.getId())) {
					int quantity = cart.getQuantity() - 1;
					cart.setQuantity(quantity);
					cart.setTotalPrice(cart.getTotalPrice() - NewItem.getItemPrice());
					if (cart.getQuantity() < 1) {
						ExistingCart.remove(cart);
						if (ExistingCart.isEmpty()) {
							break;
						}
					}
				}
			}
		}

		User UpdatedUser = userService.updateUser(userDetails);
		return new ResponseEntity<Object>(UpdatedUser.getCart(), HttpStatus.OK);
	}

	@PutMapping("/cart/removeItem/{id}")
	public ResponseEntity<Object> removeItemFromCart(@PathVariable String id, @RequestBody Item NewItem) {
		User userDetails = userService.getUserById(id);
		List<Cart> ExistingCart = userDetails.getCart();
		if (!ExistingCart.isEmpty()) {
			for (Cart cart : ExistingCart) {
				String ItemId = cart.getId();
				if (ItemId.equals(NewItem.getId())) {
					ExistingCart.remove(cart);
					if (ExistingCart.isEmpty()) {
						break;
					}
				}
			}
			System.out.println("removedItem Success-> ");
			User UpdatedUser = userService.updateUser(userDetails);
			return new ResponseEntity<Object>(UpdatedUser.getCart(), HttpStatus.OK);
		}
		return new ResponseEntity<Object>(userDetails.getCart(), HttpStatus.OK);
	}

	@PutMapping("/cart/payment/{id}")
	public ResponseEntity<Object> PaymentAllFromCart(@PathVariable String id, @RequestBody String address) {
		User userDetails = userService.getUserById(id);
		 List<Cart> ExistingCart = userDetails.getCart();
		 List<Order> ExistingOrder= userDetails.getOrder();
		for (Cart cart : ExistingCart) {
			Order order=new Order();
			order.setId(cart.getId());
			order.setItem(cart.getItem());
			order.setAddress(address);
			order.setQuantity(cart.getQuantity());
			order.setTotalPrice(cart.getTotalPrice());
			cart.setStatus("Payment Done");
			//cart.setQuantity(0);
			//cart.setTotalPrice(0);
			//System.out.println(cart.getId());
			ExistingOrder.add(order);
		}
		ExistingCart.clear();
		//userDetails.setCart(null);
		//System.out.println(id);
		//System.out.println(address);
		
		userDetails.setCart(ExistingCart);
		userDetails.setOrder(ExistingOrder);
		User UpdatedUser = userService.updateUser(userDetails);
		return new ResponseEntity<Object>(UpdatedUser.getOrder(), HttpStatus.OK);
	}
}
