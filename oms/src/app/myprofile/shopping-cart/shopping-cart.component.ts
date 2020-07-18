import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartList:any=[]
  cartTotal:number;
  quantaty:number;
  
  cart = [
    {
      text: "Everfresh Flowers",
      image: "http://pngimg.com/uploads/running_shoes/running_shoes_PNG5827.png"
    },
    {
      text: "Festive Deer",
      image: "https://cdn140.picsart.com/268948212025211.png?r1024x1024"
    },
    {
      text: "Morning Greens",
      image: "http://pluspng.com/img-png/shoes-png-sneaker-png-transparent-image-2500.png"
    },
    {
      text: "Everfresh Flowers",
      image: "https://i.pinimg.com/236x/36/9f/4c/369f4c4013e19c9b3c671de3dc696d2b.jpg"
    },
  ];
  constructor(private cartlistservice:CartService) { }

  ngOnInit() {
this.cartlistservice.getAllCartLIst()
.subscribe(data => {
  console.log("cartlist.....",data)
  this.cartList=data;
  this.cartList=this.cartList.response;
  console.log("cartlist.....",this.cartList)
  this.calcCartTotal();
} )

 }

 deleteCartListItem(id){
   this.cartlistservice.deleteCartItem(id).subscribe(
     (data)=>console.log("hiiii",data)
   )
   console.log(id)
   alert("Removed the Item Successfully.....");
   window.location.reload();
   
 }

 calcCartTotal() {
  this.cartTotal = 0;
  this.quantaty=1;
  this.cartList.forEach(item => {
    this.cartTotal += (item.qty * item.price)
    // if(item.id=item.id){
    //   this.quantaty += (item.qty)
    // }
    
    console.log("cartTotel.....",this.cartTotal)
  })
  
 }

}
