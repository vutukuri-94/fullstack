import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import {CartService} from '../services/cart.service'



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  carouselOptions = 
  {
    items: 1, 
    dots: false, 
    navigation: false, 
    loop:true,
    margin:10,
    autoplay:true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
    
}
  products:any= [];
  
  constructor(private router: Router, private productService: ProductService, private cartService:CartService ) {
    this.dataSource.data = TREE_DATA;
   
   }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  ngOnInit() {
    this.productService.getAllProducts()
    .subscribe(data =>{ this.products = data
         // console.log(this.products.response);
          this.products=this.products.response;
          console.log(this.products);
    });   
    console.log(this.products)
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  
productHome(id) {
  this.router.navigate(['product/'+id]);
}

//cartItems = [];

handleAddToCart(prod) {
  prod.qty=1;
  prod.totel=prod.price*prod.qty;
  let cartItems=prod;
//this.cartItems.push(prod);
  this.cartService.addProductToCart(cartItems)
  .subscribe( 
    res=> console.log("sucess",res),
    error => console.error("error",error)
  )
 // this.cartItems.slice(0,this.cartItems.length)
 alert("added Item Sucessfully.....");
  console.log(cartItems)
  console.log("hiii")
}

}



/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Mens',
    children: [
      {name: 'Shirt'},
      {name: 'Shoes'},
      {name: 'Jeans'},
    ]
  }, {
    name: 'Womens',
    children: [
      {name: 'Shirt'},
      {name: 'Shoes'},
      {name: 'Jeans'},
    ]
  },{
    name: 'Child',
    children: [
      {name: 'Shirt'},
      {name: 'Shoes'},
      {name: 'Jeans'},
    ]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}