package com.spring.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.spring.api.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
	
	List<Address> findByAccount_accountId(Long accountId);
	
	@Query(value="select * from address as addr inner join address_type as type "
			+ "on addr.address_id = type.address_id "
			+ "where addr.account_id = :accountId and type.address_type > 0", nativeQuery=true)
	List<Address> findByAccountIdAndAccountTypeGreaterThan(@Param(value="accountId") Long accountId);
	
	@Query(value="select * from address as addr inner join address_type as type "
			+ "on addr.address_id = type.address_id "
			+ "where addr.account_id = :accountId and type.address_type = :addressType", nativeQuery=true)
	Optional<Address> findByAccountIdAndAddressType(@Param(value="accountId") Long accountId,
												@Param(value="addressType") Integer addressTyppe);
	
	
	//Address findByAccountIdAndAddressType(Long accountId, Integer addressType);
	
}
