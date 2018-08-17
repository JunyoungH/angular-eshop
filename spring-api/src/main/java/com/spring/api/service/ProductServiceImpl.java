package com.spring.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.api.model.Product;
import com.spring.api.repository.ProductRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	ProductRepository productRepository;
	
	

	@Override
	public List<Product> findAll() {
		return productRepository.findAll();
	}

	@Override
	public void saveProduct(Product product) {
		productRepository.save(product);
	}

}
