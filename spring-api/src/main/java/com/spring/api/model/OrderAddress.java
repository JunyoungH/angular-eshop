package com.spring.api.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/********************************************************
 * Many to Many relationship between Order and Address
 * ******************************************************/

@Entity
public class OrderAddress {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private Long oderAddressId;
	
	@ManyToOne
	@JoinColumn(name="orderId")
	private Orders order;
	
	@ManyToOne
	@JoinColumn(name="addressId")
	private Address address;
	

	public OrderAddress() {
	}

	public Long getOderAddressId() {
		return oderAddressId;
	}

	public void setOderAddressId(Long oderAddressId) {
		this.oderAddressId = oderAddressId;
	}

	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	
}
