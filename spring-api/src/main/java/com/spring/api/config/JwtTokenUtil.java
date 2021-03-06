package com.spring.api.config;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.spring.api.common.Constant;
import com.spring.api.model.Account;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil implements Serializable {

	private static final long serialVersionUID = -1695279892163148068L;
	
	public String getUserNameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
	}
	
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}
	
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser()
				.setSigningKey(Constant.SIGNING_KEY)
				.parseClaimsJws(token)
				.getBody();
	}
	
	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
	
	public String generateToken(Account account) {
		return doGenerateToken(account);
	}
	
	public String doGenerateToken(Account account) {
		Claims claims = Jwts.claims().setSubject(account.getEmail());
		claims.put("scopes", Arrays.asList(new SimpleGrantedAuthority(account.getUserType())));
		claims.put("accountId", account.getAccountId());
		
		return Jwts.builder()
				.setClaims(claims)
				.setIssuer("Jensen")
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+Constant.ACCESS_TOKEN_VALIDITY_SECONDS*1000))
				.signWith(SignatureAlgorithm.HS256, Constant.SIGNING_KEY)
				.compact();
	}
	
	public Boolean valideToken(String token, UserDetails userDetails) {
		final String userName = getUserNameFromToken(token);
		return (
				userName.equals(userDetails.getUsername())
					&& !isTokenExpired(token));
	}
}
