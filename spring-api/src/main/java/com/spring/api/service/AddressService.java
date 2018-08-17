package com.spring.api.service;

import java.util.List;

import com.spring.api.model.Address;
import com.spring.api.model.AddressType;

public interface AddressService {
	
	void saveAddress(Address address);
	void saveAddressType(AddressType addressType);
	List<Address> findByAccountId(Long accountId);
	List<Address> findByAccountIdAndAccountType(Long accountId);
	Address findByAddressId(Long addressId);
	void findByAccountIdAndAddressType(Long accountId, Integer addressType);
	AddressType findByAddressTypeId(Long addressTypeId);
}
