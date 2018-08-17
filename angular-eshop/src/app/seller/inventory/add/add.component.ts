import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { InventoryService } from '../../../core/service/inventory.service';
import { Product} from '../../../core/model/product.model';
import { DomSanitizer } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Output() toList:EventEmitter<boolean> = new EventEmitter<boolean>();

  product = new Product();
  imageList:any[] = [];
  imageTemp:File[] = [];
  imageContainer;

  constructor(private inventoryService:InventoryService, private sanitizer:DomSanitizer) { }

  ngOnInit() {

    let elems = document.querySelectorAll('select');
    let instances = M.FormSelect.init(elems);

  }

  imageUpload(event){

    Array.from(event.currentTarget.files, (val, key)=> this.previewImageLoad(val));
    console.log(this.imageTemp);

  }

  previewImageLoad(file){
    let sanitizedURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    this.imageList.push(sanitizedURL);
    this.imageTemp.push(file);

  }

  removeImage(param){
    this.imageList.splice(param, 1);
    this.imageTemp.splice(param, 1);

  }

  showRemove(event){
    event.currentTarget.querySelector('i').hidden = false;
  }

  hideRemove(event){
    event.currentTarget.querySelector('i').hidden = true;
  }

  onSubmit(){

    this.inventoryService.saveProduct(this.product, this.imageTemp).subscribe(
      (result)=>this.toList.emit(false),
      (error)=>console.log(error)
    );
  }

}
