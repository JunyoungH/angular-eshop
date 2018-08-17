package com.spring.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.api.model.Address;
import com.spring.api.model.AddressType;
import com.spring.api.repository.AddressRepository;
import com.spring.api.repository.AddressTypeRepository;

@Service
@Transactional
public class AddressServiceImpl implements AddressService {
	
	@Autowired
	AddressRepository addressRepository;
	
	@Autowired
	AddressTypeRepository addressTypeRepository;
	

	@Override
	public void saveAddress(Address address) {
		
		addressRepository.save(address);
	}

	@Override
	public List<Address> findByAccountId(Long accountId) {
		return addressRepository.findByAccount_accountId(accountId);
	}
	
	
	@Override
	public List<Address> findByAccountIdAndAccountType(Long accountId) {
		return addressRepository.findByAccountIdAndAccountTypeGreaterThan(accountId);
	}

	@Override
	public Address findByAddressId(Long addressId) {
		return addressRepository.findById(addressId).get();
	}

	@Override
	public AddressType findByAddressTypeId(Long addressTypeId) {
		return addressTypeRepository.findById(addressTypeId).get();
	}

	@Override
	public void saveAddressType(AddressType addressType) {
		addressTypeRepository.save(addressType);
	}

	@Override
	public void findByAccountIdAndAddressType(Long accountId, Integer addressType) {
		addressRepository.findByAccountIdAndAddressType(accountId, addressType).ifPresent(value->{
			addressTypeRepository.deleteAddressTypeByAddressTypeId(value.getAddressId(), addressType);;
		});
	}
	
	

}
