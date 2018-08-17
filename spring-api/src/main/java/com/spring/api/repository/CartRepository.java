package com.spring.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
	
	List<Cart> findByProduct_Account_Email(String email);
}
