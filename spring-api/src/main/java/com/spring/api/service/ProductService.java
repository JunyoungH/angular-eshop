package com.spring.api.service;

import java.util.List;

import com.spring.api.model.Product;

public interface ProductService {
	
	List<Product> findAll();
	
	void saveProduct(Product product);
	
}
