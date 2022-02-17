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

import com.example.test.model.Item;
import com.example.test.service.ItemService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/item")
public class ItemController {
	private final ItemService itemService;
	public ItemController(ItemService itemService) {
		this.itemService = itemService;
	}
	@PostMapping("/add")
	public ResponseEntity<Object> addItem(@RequestBody Item item) {
		//System.out.println(item);
		itemService.additem(item);
		return new ResponseEntity<Object>("success",HttpStatus.CREATED);
	}
	@PutMapping("/update")
    public ResponseEntity<?> updateItem(@RequestBody Item item) {
        itemService.updateItem(item);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
	@GetMapping("/all")
	public ResponseEntity<List<Item>> getAllItem() {
		
		return ResponseEntity.ok(itemService.getAllItem());
	}
	@GetMapping("/{name}")
    public ResponseEntity<Item> getItemByName(@PathVariable String name) {
        return ResponseEntity.ok(itemService.getItem(name));
    }
	@DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
