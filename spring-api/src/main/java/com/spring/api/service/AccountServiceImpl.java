package com.spring.api.service;

import static com.spring.api.common.Constant.ERROR_MESSAGE;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.api.model.Account;
import com.spring.api.repository.AccountRepository;

@Service(value = "userService")
@Transactional
public class AccountServiceImpl implements UserDetailsService, AccountService {
	
	@Autowired
	AccountRepository accountRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Account account = accountRepository.findByEmail(email);
		if(account == null) {
			ERROR_MESSAGE = "Inavlid username or password.";
			throw new  UsernameNotFoundException("Inavlid username or password.");
		}
		return new User(account.getEmail(), account.getPassword(), getAuthority(account));
	}
	
	private List<SimpleGrantedAuthority> getAuthority(Account account){
		return Arrays.asList(new SimpleGrantedAuthority(account.getUserType()));
	}

	@Override
	public List<Account> findAll() {
		return accountRepository.findAll();
	}

	@Override
	public Account findById(Long userId) {
		return accountRepository.findById(userId).get();
		
	}
	
	@Override
	public Account findByEmail(String email) {
		return accountRepository.findByEmail(email);
	}

	@Override
	public void registerUser(Account userDTO) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		userDTO.setPassword(encoder.encode(userDTO.getPassword()));
		accountRepository.save(userDTO);
		
	}
	
	
}
