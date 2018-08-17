package com.spring.api.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.spring.api.model.Account;
import com.spring.api.model.Product;
import com.spring.api.model.ProductImage;
import com.spring.api.service.AccountService;
import com.spring.api.service.ProductService;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
public class ProductController {
	
	@Autowired
	AccountService accountService;
	
	@Autowired
	ProductService productService;
	
	private static final String UPLOAD_FOLDER = "\\upload\\";
	
	@PostMapping("/api/products/add")
	public void saveProduct(@RequestPart(name="product") String productJson, 
						@RequestPart(name="imageList[]") MultipartFile imageList[],
						Account account,
						Authentication principal) throws IOException{
		
		 Gson gson = new Gson();
		 Product product = gson.fromJson(productJson, Product.class);
		 account = accountService.findByEmail(principal.getName());
		 
		 List<ProductImage> productImageList = setProductImage(imageList);
		 product.setProductImageList(productImageList);
		 product.setCompany(account.getCompanyName());
		 product.setAccount(account);
		 productService.saveProduct(product);
	}
	
	@GetMapping("/api/products/my-products")
	public List<Product> getProductListByLoginEmail(Authentication principal){
		return accountService.findByEmail(principal.getName()).getProductList();
	}
	
	@GetMapping("/api/products/all-products")
	public List<Product> getAllProductList(){
		return productService.findAll();
	}
	
	
	//Image upload handler
	List<ProductImage> setProductImage(MultipartFile imageList[]) throws IOException{
		 List<ProductImage> productImageList = new ArrayList<ProductImage>();
		 
		 
		 String realPath = String.valueOf(new ClassPathResource("").getFile());
		 if(!new ClassPathResource(UPLOAD_FOLDER).exists())
			 new File(realPath+UPLOAD_FOLDER).mkdir();
	 
		 for(MultipartFile image : imageList) {
			
			 String currentTime = String.valueOf(System.currentTimeMillis());
			 String imageName = currentTime+"_"+image.getOriginalFilename();
		
			 image.transferTo(new File(realPath+UPLOAD_FOLDER+imageName));
			 ProductImage productImage = new ProductImage(imageName);
			 productImageList.add(productImage);

			System.out.println(image.getOriginalFilename());
		}
		 
		 return productImageList;
	}
	

}
