package com.spring.api.service;

import java.util.List;

import com.spring.api.model.Account;

public interface AccountService {
	List<Account> findAll();
	Account findById(Long userId);
	Account findByEmail(String email);
	void registerUser(Account userDTO);
}