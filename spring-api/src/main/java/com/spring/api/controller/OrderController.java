package com.spring.api.controller;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.api.model.Address;
import com.spring.api.model.Cart;
import com.spring.api.model.OrderAddress;
import com.spring.api.model.Orders;
import com.spring.api.service.AccountService;
import com.spring.api.service.OrderService;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
public class OrderController {
	
	private final Logger logger = LoggerFactory.getLogger(AccountController.class);
	
	@Autowired
	OrderService orderService;
	
	@Autowired
	AccountService accountService;
	
	@PostMapping("/api/order/add")
	public void addOrder(@RequestBody Orders order, Authentication principal) {
		
		logger.info("ADD ORDER ||"+ order.getAddressList().size());
		
		order.setAccount(accountService.findByEmail(principal.getName()));
		order.setOrderCreatedDate(new Date());
		order = orderService.saveOrder(order);

		
		for(Address address:order.getAddressList()) {
			OrderAddress orderAddress = new OrderAddress();
			orderAddress.setOrder(order);
			orderAddress.setAddress(address);
			orderService.saveOrderAddress(orderAddress);
		}
		
		for(Cart cart:order.getCartList()) {
			cart.setOrder(order);
			cart.setCartCreatedDate(new Date());
			orderService.saveCart(cart);
		}
		
	}
	
	@GetMapping("/api/order/find/seller")
	public List<Cart> findOrderBySeller(Authentication principal){
		return orderService.findOrderBySeller(principal.getName());
	}
}
