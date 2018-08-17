package com.spring.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.api.model.Address;
import com.spring.api.model.AddressType;
import com.spring.api.service.AccountService;
import com.spring.api.service.AddressService;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
public class AddressController {

	@Autowired
	AddressService addressService;
	
	@Autowired
	AccountService accountService;
	
	@PostMapping("/api/address/add/address")
	public List<Address> addAddress(@RequestBody Address address){
		
		address.setAccount(accountService.findById(address.getAccountId()));
		addressService.saveAddress(address);
		
		return addressService.findByAccountId(address.getAccountId());
	}
	
	@GetMapping("/api/address/find/address/{accountId}")
	public List<Address> getAllAddress(@PathVariable("accountId") Long accountId){
		return addressService.findByAccountId(accountId);
	}
	
	@GetMapping("/api/address/find/address-default/{accountId}")
	public List<Address> getDefaultAddress(@PathVariable("accountId") Long accountId){
		return addressService.findByAccountIdAndAccountType(accountId);
	}
	
	@PostMapping("/api/address/add/address-type")
	public List<Address> addAddressType(@RequestBody Address address, AddressType addressType) {
		addressService.findByAccountIdAndAddressType(address.getAccountId(), address.getAddressType());
		addressType.setAddress(address);
		addressType.setAddressType(address.getAddressType());
		addressService.saveAddressType(addressType);
	
	return addressService.findByAccountId(address.getAccountId());
	}
	
}
