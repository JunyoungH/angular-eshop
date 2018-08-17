package com.spring.api.model;

import javax.persistence.*;

@Entity
public class ProductImage {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private Long productImageId;
	
	@Column
	private String name;
	
	public ProductImage() {}
	
	public ProductImage(String name) {
		super();
		this.name = name;
	}

	public Long getProductImageId() {
		return productImageId;
	}

	public void setProductImageId(Long productImageId) {
		this.productImageId = productImageId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

}
