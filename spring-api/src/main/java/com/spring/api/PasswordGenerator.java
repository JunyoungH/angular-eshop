package com.spring.api;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
	
	public static void main(String[] args) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		encoder.matches("123", "$2a$10$0857JpkeZytGVsG6SC7FoeW/g9JJ/NN48MLcqnmLZMQ1RpdCwFWsW");
		System.out.println(encoder.matches("123", "$2a$10$0857JpkeZytGVsG6SC7FoeW/g9JJ/NN48MLcqnmLZMQ1RpdCwFWsW"));
	}
}
