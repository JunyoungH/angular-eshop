export class Account{
  accountId:String;
  firstName:string;
  lastName:string;
  password:string;
  email:string;
  mobileNumber:string;
  companyName:string;
  companyContact:string;
  userType: string;
  userRole:string;

}

export class Address{
  accountId:string;
  fullName:string;
  contactNumber:string;
  mainAddress:string;
  subAddress:string;
  city:string;
  country:string;
  postalCode:string;
  addressId:string; //transient
  addressType:number; //transient
  addressTypeList:AddressType[] = [];

}

export class AddressType{
  addressTypeId:string;
  addressType:number;
}

export class creditCard{
  creditCardId:string;
  creditCardNumber:number;
}



