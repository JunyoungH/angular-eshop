package com.spring.api.model;

import java.util.List;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Product{
	

	@Id	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long productId;
	
	@Column(length = 100)
	private String name;
	
	@Column(length = 100)
	private Double price;
	
	@Column(length = 10)
	private String currency;
	
	@Column(length = 10)
	private String unit;
	
	@Column(length = 50)
	private String countryOrigin;
	
	@Column(length = 30)
	private String category;
	
	@Column(length = 1000)
	private String discription;
	
	@Column(length = 50)
	private String company;

	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name="product_id")
	private List<ProductImage> productImageList;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="account_id")
	private Account account;
	
	@JsonIgnore
	@OneToOne(mappedBy="product")
	private Cart cart;

	
	public Product() {}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}
	
	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getCountryOrigin() {
		return countryOrigin;
	}

	public void setCountryOrigin(String countryOrigin) {
		this.countryOrigin = countryOrigin;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDiscription() {
		return discription;
	}

	public void setDiscription(String discription) {
		this.discription = discription;
	}

	public List<ProductImage> getProductImageList() {
		return productImageList;
	}

	public void setProductImageList(List<ProductImage> productImageList) {
		this.productImageList = productImageList;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}


	
	
}
