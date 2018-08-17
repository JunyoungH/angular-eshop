package com.spring.api.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
public class Orders {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private Long orderId;
	
	@Column
	private Double totalPrice;
	
	@Column
	private String paymentType;
	
	@Temporal(TemporalType.DATE)
	private Date orderCreatedDate;

	@ManyToOne
	@JoinColumn(name="account_id")
	private Account account;
	
	@OneToMany(mappedBy="order")
	private List<Cart> cartList;
	
	@JsonIgnore
	@OneToMany(mappedBy="order")
	private List<OrderAddress> orderAddressList;
	
	@Transient
	private List<Address> addressList;
	

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}



	public List<Cart> getCartList() {
		return cartList;
	}

	public void setCartList(List<Cart> cartList) {
		this.cartList = cartList;
	}

	public Date getOrderCreatedDate() {
		return orderCreatedDate;
	}

	public void setOrderCreatedDate(Date orderCreatedDate) {
		this.orderCreatedDate = orderCreatedDate;
	}

	public List<OrderAddress> getOrderAddressList() {
		return orderAddressList;
	}

	public void setOrderAddressList(List<OrderAddress> orderAddressList) {
		this.orderAddressList = orderAddressList;
	}

	public List<Address> getAddressList() {
		return addressList;
	}

	public void setAddressList(List<Address> addressList) {
		this.addressList = addressList;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}
	
	
	

}
