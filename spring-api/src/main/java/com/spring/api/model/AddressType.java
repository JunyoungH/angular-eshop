package com.spring.api.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class AddressType {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private Long addresTypeId;
	
	@Column
	private Integer addressType;
	
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="address_id")
	private Address address;
			
	public Long getAddresTypeId() {
		return addresTypeId;
	}

	public void setAddresTypeId(Long addresTypeId) {
		this.addresTypeId = addresTypeId;
	}

	
	public Integer getAddressType() {
		return addressType;
	}

	public void setAddressType(Integer addressType) {
		this.addressType = addressType;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	

	
}
