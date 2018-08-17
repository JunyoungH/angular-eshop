package com.spring.api.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Address {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private Long addressId;
	
	@Column(length=45)
	private String fullName;
	
	@Column(length=45)
	private Integer contactNumber;
	
	@Column(length=255)
	private String mainAddress;
	
	@Column(length=255)
	private String subAddress;
	
	@Column(length=11)
	private Integer postalCode;
	
	@Column(length=45)
	private String city;
	
	@Column(length=45)
	private String country;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="account_id")
	private Account account;
	
	@OneToMany(mappedBy="address", fetch=FetchType.EAGER)
	private List<AddressType> addressTypeList;
	
	
	@Transient
	private Integer addressType;
	
	@Transient
	private Long accountId;
	
	
	public Address() {}

	public Long getAddressId() {
		return addressId;
	}

	public void setAddressId(Long addressId) {
		this.addressId = addressId;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public Integer getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(Integer contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getMainAddress() {
		return mainAddress;
	}

	public void setMainAddress(String mainAddress) {
		this.mainAddress = mainAddress;
	}

	public String getSubAddress() {
		return subAddress;
	}

	public void setSubAddress(String subAddress) {
		this.subAddress = subAddress;
	}

	

	public Integer getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(Integer postalCode) {
		this.postalCode = postalCode;
	}

		
	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}


	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public Integer getAddressType() {
		return addressType;
	}

	public void setAddressType(Integer addressType) {
		this.addressType = addressType;
	}

	public List<AddressType> getAddressTypeList() {
		return addressTypeList;
	}

	public void setAddressTypeList(List<AddressType> addressTypeList) {
		this.addressTypeList = addressTypeList;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}


	
	
}
