package com.example.test.Repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.test.model.User;

public interface UserRepository extends MongoRepository<User, String> {
	@Query("{'name': ?0}")
    Optional<User> findByName(String name);

	@Query("{'userEmail': ?0}")
    Optional<User> findByUserEmail(String userEmail);

}
