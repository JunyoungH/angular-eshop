package com.spring.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Orders;

public interface OrderRepository extends JpaRepository<Orders, Long> {

}
