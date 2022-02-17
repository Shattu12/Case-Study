package com.example.test.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.test.Repository.ItemRepository;
import com.example.test.model.Item;

@Service
public class ItemService {
	private final ItemRepository itemRepository;

	public ItemService(ItemRepository itemRepository) {
		this.itemRepository = itemRepository;
	}

	public void additem(Item item) {
		itemRepository.insert(item);
	}

	public void updateItem(Item item) {
		Item savedItem = itemRepository.findById(item.getId()).orElseThrow(
				() -> new RuntimeException(String.format("Cannot Find Item by ID %s", item.getId())));
		savedItem.setItemName(item.getItemName());
		savedItem.setItemDesc(item.getItemDesc());
		savedItem.setItemPrice(item.getItemPrice());
		savedItem.setItemSize(item.getItemSize());
		savedItem.setItemImage(item.getItemImage());
		savedItem.setItemType(item.getItemType());
		savedItem.setItemCategory(item.getItemCategory());
		
		itemRepository.save(item);
	}

	public List<Item> getAllItem() {
		return itemRepository.findAll();

	}
	public Item getItem(String name) {
		return itemRepository.findByName(name)
				.orElseThrow(() -> new RuntimeException(String.format("Cannot Find Item by Name - %s", name)));
	}

	public void deleteItem(String id) {
		itemRepository.deleteById(id);
	}
}
