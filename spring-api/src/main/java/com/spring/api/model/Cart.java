package com.spring.api.model;

import java.util.Date;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Cart {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private Long cartId;
	
	@Column
	private Double orderedQuantity;
	
	@Column
	private Double totalPrice;
	
	@Column
	private Double actualQuantity;
	
	@Column(columnDefinition="int(11) default 0")
	private Integer status;
	
	@Temporal(TemporalType.DATE)
	private Date cartCreatedDate;
	
	@OneToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="order_id")
	private Orders order;
	

	public Cart() {}


	public Long getCartId() {
		return cartId;
	}


	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}


	public Double getOrderedQuantity() {
		return orderedQuantity;
	}


	public void setOrderedQuantity(Double orderedQuantity) {
		this.orderedQuantity = orderedQuantity;
	}


	public Double getTotalPrice() {
		return totalPrice;
	}


	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}


	public Double getActualQuantity() {
		return actualQuantity;
	}


	public void setActualQuantity(Double actualQuantity) {
		this.actualQuantity = actualQuantity;
	}


	public Integer getStatus() {
		return status;
	}


	public void setStatus(Integer status) {
		this.status = status;
	}


	public Date getCartCreatedDate() {
		return cartCreatedDate;
	}


	public void setCartCreatedDate(Date cartCreatedDate) {
		this.cartCreatedDate = cartCreatedDate;
	}


	public Product getProduct() {
		return product;
	}


	public void setProduct(Product product) {
		this.product = product;
	}


	public Orders getOrder() {
		return order;
	}


	public void setOrder(Orders order) {
		this.order = order;
	}

	
	
	
}
