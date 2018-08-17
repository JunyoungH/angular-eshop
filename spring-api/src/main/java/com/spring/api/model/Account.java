package com.spring.api.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "account")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long accountId;

	@Column
	private String firstName;

	@Column
	private String lastName;

	@Column
	private String password;

	@Column
	private String email;

	@Column(length = 20)
	private Integer mobileNumber;

	@Column
	private String companyName;

	@Column(length = 20)
	private Integer companyNumber;

	@Column(length = 1)
	private Integer userRole;

	@Transient
	String userType;
	
	@OneToMany(mappedBy="account", cascade=CascadeType.ALL)
	List<Product> productList;
	
	@OneToMany(mappedBy="account", cascade=CascadeType.ALL)
	List<Address> addressList;

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public Integer getUserRole() {
		return userRole;
	}

	public void setUserRole(Integer userRole) {
		this.userRole = userRole;
	}

	public List<Product> getProductList() {
		return productList;
	}
	
	

	public Integer getMobileNumber() {
		return mobileNumber;
	}

	public Integer getCompanyNumber() {
		return companyNumber;
	}

	public void setProductList(List<Product> productList) {
		this.productList = productList;
	}

	public void setMobileNumber(Integer mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public void setCompanyNumber(Integer companyNumber) {
		this.companyNumber = companyNumber;
	}

	public String getUserType() {
		switch (this.userRole) {
		case 1:
			this.userType = "SELLER";
			break;
		case 2:
			this.userType = "USER";
			break;
		case 3:
			this.userType = "ADMIN";
			break;
		}
		return userType;
	}

	public List<Address> getAddressList() {
		return addressList;
	}

	public void setAddressList(List<Address> addressList) {
		this.addressList = addressList;
	}
	
	
	
}
