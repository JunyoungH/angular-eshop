package com.spring.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long>  {
	
	Account findByEmail(String email);
}
