package com.spring.api.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.RequestScope;

import com.spring.api.model.Account;
import com.spring.api.model.Address;
import com.spring.api.service.AccountService;
import com.spring.api.service.AddressService;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
public class AccountController {
	
	private final Logger logger = LoggerFactory.getLogger(AccountController.class);
	
	@Autowired
	AccountService accountService;
	

	
	@PostMapping("/api/account/register")
	public void registerUser(@RequestBody Account account) {
		logger.info("registerUser || Started", account.getEmail());
		accountService.registerUser(account);
		logger.info("registerUser || End", account.getEmail());
	}
	
	@GetMapping("/api/account/find/{email}")
	public Account findByEmail(@PathVariable("email") String email) {
		return accountService.findByEmail(email);
	}
	

}
