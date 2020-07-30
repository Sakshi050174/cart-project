import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PopupComponent} from '../popup/popup.component';
// import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  selectedItems = [];
  subTotal = 0.000;
  total = 0.000;
  vatTax = {percent:  '0', amount: 0.000};
  discount = {percent:  '0', amount: 0.000};
  totalItems = 0;
  products = [
    {
      "name": "comuter",
      "price": "130",
      "category": "computers",
      "description": "",
      "image": "comuter.jpg"
    },
    {
      "name": "sweater",
      "price": "1",
      "category": "Clothing",
      "description": "fashion, clothes , sweater, wool, cardigan,…"
    },
    {
      "name": "tie",
      "price": "46",
      "category": "Clothing",
      "description": "fashion, tie, clothes, accessory , accessoire,…",
      "image": "tie.jpeg"
    },
    {
      "name": "jacket",
      "price": "190",
      "category": "Clothing",
      "description": "winter  jacket ",
      "image": "jacket.jpeg"
    },
    {
      "name": "jacket men",
      "price": "225",
      "category": "Clothing",
      "description": "fashion  man  jacket ",
      "image": "jacket_men.jpg"
    },
    {
      "name": "grapes",
      "price": "18",
      "category": "fruits",
      "description": "food ,  leaf,  grape,s  wet,  green",
      "image": "grapes.jpeg"
    },
    {
      "name": "strawberries",
      "price": "15",
      "category": "fruits",
      "description": "healthy  red sweet  strawberries",
      "image": "strawberries.jpeg"
    },
    {
      "name": "kiwi",
      "price": "50",
      "category": "fruits",
      "description": "fruit  kiwi ",
      "image": "kiwi.jpeg"
    },
    {
      "name": "mouse",
      "price": "80",
      "category": "computers",
      "description": "apple   mouse  ",
      "image": "mouse.jpg"
    },
    {
      "name": "keyboard",
      "price": "80",
      "category": "computers",
      "description": "apple mac  keyboard",
      "image": "keyboard.jpg"
    },
    {
      "name": "headphone",
      "price": "120",
      "category": "computers",
      "description": "music headphone",
      "image": "headphone.jpg"
    },
    {
      "name": "motherboard",
      "price": "179",
      "category": "computers",
      "description": "pc motherboard with 16 Gb RAM",
      "image": "motherboard.jpg"
    },
    {
      "name": "notebook",
      "price": "760",
      "category": "computers",
      "description": "macbook  notebook  computer",
      "image": "notebook.jpg"
    },
    {
      "name": "computer repair",
      "price": "350",
      "category": "services",
      "description": "standard computer repairing",
      "image": "computer_repair.jpeg"
    },
    {
      "name": "gift folding",
      "price": "7",
      "category": "services",
      "description": "",
      "image": "gift_folding.jpeg"
    },
    {
      "name": "Clothing",
      "price": "100",
      "category": "Clothing",
      "description": "",
      "image": "clothing.jpg"
    },
    {
      "name": "nivea pocket",
      "price": "7",
      "category": "services",
      "description": ""
    },
    {
      "name": "nivea pocket bleu",
      "price": "8",
      "category": "Catégorie",
      "description": ""
    },
    {
      "name": "chilli hot pizza",
      "price": "200",
      "category": "pizza",
      "description": ""
    }
  ];
  changeQuant(item: any, isAdd: any, index): void{
    if( isAdd != null){
      item.quantity =  isAdd ? item.quantity + 1 : item.quantity - 1;
    }
    item.total = item.quantity * item.price;
    if(!item.quantity){
     this.selectedItems.splice(index, 1);
   }
    this.updateBill();
  }
  addItem(temp): void{
    temp.quantity = !temp.quantity ? 1 : temp.quantity + 1;
    temp.total = temp.quantity * temp.price;
    const index = this.selectedItems.findIndex(obj=>{ if(obj.name == temp.name)return obj;});
    if(index == -1){
      this.selectedItems.push(temp);
    }
    this.updateBill();
  }
  updateBill(): void{
    this.subTotal = 0;
    this.totalItems = 0;
    this.selectedItems.forEach(obj => {
      this.subTotal += obj.quantity * obj.price;
      this.totalItems += obj.quantity;
    });
    const res = this.discount.percent.match('[0-9]+%');
    const vatPercent = this.vatTax.percent.split('%')[0];
    const discountPercent = this.discount.percent.split('%')[0];
    this.vatTax.amount =  (this.subTotal * Number(vatPercent)) / 100;
    this.discount.amount = (this.subTotal * Number(discountPercent)) / 100;
    this.total = this.vatTax.amount + this.subTotal + this.discount.amount;

  }
  removeItem(index): void{
    this.selectedItems.splice(index, 1);
  }
  cancel(): void{
    this.selectedItems = [];
    this.subTotal = 0.000;
    this.total = 0.000;
    this.vatTax = {percent:  '0', amount: 0.000};
    this.discount = {percent:  '0', amount: 0.000};
    this.totalItems = 0;
  }
  submit(): void{
    this.dialog.open(PopupComponent, {
      panelClass: 'popup-bill',
      hasBackdrop: true,
      disableClose: true,
      height: 'auto',
      width: '300px',
      data: { selectedItems: this.selectedItems, subTotal: this.subTotal,
        total: this.total,
        vatTax: this.vatTax,
        discount : this.discount,
        totalItems : this.totalItems }
    });
  }
  inputChange(event): void{
    if (event.target.checkValidity()){
      this.updateBill();
    }else{
      event.target.value = '0';
    }
  }
  ngOnInit(): void {
  }

}
