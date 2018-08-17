package com.spring.api.service;

import java.util.List;

import com.spring.api.model.Cart;
import com.spring.api.model.OrderAddress;
import com.spring.api.model.Orders;

public interface OrderService {
	
	Orders saveOrder(Orders order);
	void saveCart(Cart cart);
	void saveOrderAddress(OrderAddress orderAddress);
	List<Cart> findOrderBySeller(String email);

}
