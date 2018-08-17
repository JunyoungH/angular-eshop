package com.spring.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.OrderAddress;

public interface OrderAddressRepository extends JpaRepository<OrderAddress, Long> {

}
