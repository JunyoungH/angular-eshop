package com.spring.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.cassandra.CassandraReactiveRepositoriesAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.api.model.Cart;
import com.spring.api.model.OrderAddress;
import com.spring.api.model.Orders;
import com.spring.api.repository.CartRepository;
import com.spring.api.repository.OrderAddressRepository;
import com.spring.api.repository.OrderRepository;


@Service
@Transactional
public class OrderServiceImpl implements OrderService {
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	CartRepository cartRepository;
	
	@Autowired
	OrderAddressRepository orderAddressRepository;
	
	@Override
	public Orders saveOrder(Orders order) {
		return orderRepository.saveAndFlush(order);
	}

	@Override
	public void saveCart(Cart cart) {
		cartRepository.save(cart);
	}

	@Override
	public void saveOrderAddress(OrderAddress orderAddress) {
		orderAddressRepository.save(orderAddress);
	}

	@Override
	public List<Cart> findOrderBySeller(String email) {
		return cartRepository.findByProduct_Account_Email(email);
	}
	
	
	
}
