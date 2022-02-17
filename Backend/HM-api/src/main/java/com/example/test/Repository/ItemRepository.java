package com.example.test.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.test.model.Item;

public interface ItemRepository extends MongoRepository<Item, String> {
	@Query("{'name': ?0}")
	Optional<Item> findByName(String name);
}
