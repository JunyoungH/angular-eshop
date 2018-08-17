package com.spring.api.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.spring.api.common.Constant;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired
	private UserDetailsService userDetailService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain filter)
			throws ServletException, IOException {
		String header = req.getHeader(Constant.HEADER_STRING);
		String userName = null;
		String authToken = null;
		if(header != null && header.startsWith(Constant.TOKEN_PREFIX)) {
			authToken = header.replace(Constant.TOKEN_PREFIX, "");
			try {
				userName = jwtTokenUtil.getUserNameFromToken(authToken);
			}catch(IllegalArgumentException e){
				logger.error("an error occured during getting username from token", e);
			}catch(ExpiredJwtException e) {
				logger.warn("the token is expired and not valied anymore", e);
			}catch(SignatureException e) {
				logger.error("Authentication Failed. Username or Password not valid.");
			}
		}else {
			logger.warn("couldn't find bearer string, will ignore the header");
		}
		if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = userDetailService.loadUserByUsername(userName);
	
			if(jwtTokenUtil.valideToken(authToken, userDetails)) {
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
				logger.info("authenticated user " + userName + ", setting security context");
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		
		filter.doFilter(req, res);
	}

		
	
}
