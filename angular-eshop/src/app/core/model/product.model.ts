import { Address } from "./account.model";

export class Product{

    productId:string;
    name:string;
    price:number;
    currency:string;
    unit:string;
    countryOrigin:string;
    category:string;
    discription:string;
    company:string;
    productImageList:ProductImage[];
}

export class ProductImage{
    productImageId:string;
    name:string;
}

export class Cart{
    cartId:string;
    product:Product;
    orderedQuantity:number;
    totalPrice:number;
    actualQuantity:number;
    status:number;
}

export class Orders{
    orderId:string;
    totalPrice:number;
    paymentType:string;
    orderCreatedDate:string;
    cartList:Cart[];
    addressList:Address[] = [];
}

