package com.spring.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
