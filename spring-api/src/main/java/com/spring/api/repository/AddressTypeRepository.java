package com.spring.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.api.model.AddressType;

public interface AddressTypeRepository extends JpaRepository<AddressType, Long>{
	
	@Modifying
	@Query(value="delete from address_type where address_id = :addressId and address_type = :addressType", nativeQuery=true)
	void deleteAddressTypeByAddressTypeId(@Param(value="addressId") Long addressId, @Param(value="addressType") Integer addressType);
}
