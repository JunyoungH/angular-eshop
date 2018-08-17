package com.spring.api.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.api.common.AuthToken;
import com.spring.api.common.LoginUser;
import com.spring.api.config.JwtTokenUtil;
import com.spring.api.model.Account;
import com.spring.api.service.AccountService;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/token")
public class AuthenticationController {
	
	private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private AccountService userService;
	
	@PostMapping("/generate-token")
	public ResponseEntity<?> register(@RequestBody LoginUser loginUser) throws AuthenticationException{
		logger.debug("register || Start");
		
		System.out.println(loginUser.getEmail());
		System.out.println(loginUser.getPassword());
		final Account user = userService.findByEmail(loginUser.getEmail());
		final Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword())
				);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		final String token = jwtTokenUtil.generateToken(user);
		
		logger.debug("register || End");
		
		return ResponseEntity.ok(new AuthToken(token));
	}
}
