package com.spring.api.config;

import static com.spring.api.common.Constant.ERROR_MESSAGE;

import java.io.IOException;
import java.io.Serializable;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable{
	
	private static final long serialVersionUID = 1776283584603194266L;

	@Override
	public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException authException)
			throws IOException, ServletException {
		res.sendError(HttpServletResponse.SC_UNAUTHORIZED, ERROR_MESSAGE);
		ERROR_MESSAGE = null;
	}
}
