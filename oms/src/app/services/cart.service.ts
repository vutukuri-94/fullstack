import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {cartmodel} from '../interfaces/cartitems'
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CartService {

   cartUrl :string="http://localhost:3000/api/cart"
   cartlistUrl:string="http://localhost:3000/api/cartlist"

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  addProductToCart(cartitem:cartmodel): Observable<cartmodel> {

    console.log("cartitem below")
    console.log(cartitem)
   // return this.http.post(cartUrl, { cartitem });
   return this.http.post<any>(this.cartUrl , cartitem);
   
  }

  getAllCartLIst():Observable<cartmodel>{
    return this.http.get<cartmodel>(this.cartlistUrl)
  }

  deleteCartItem(id:number):Observable<any>{
    console.log(id)
    const url = `http://localhost:3000/api/cartlist/${id}`;
    return this.http.delete<cartmodel>(url)
   
  }

   // handle error
   handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
  
  
}

