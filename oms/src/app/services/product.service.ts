import { Injectable } from '@angular/core';
import { timeout, delay } from 'q';
import { Observable, of, from } from 'rxjs';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import {getallprods} from '../interfaces/getallprods'


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private REST_API_SERVER = "http://localhost:3000/api/products/";

  constructor(private loadingService: LoadingService, private httpClient: HttpClient) { 
    
  }

  getAllProducts(): Observable<getallprods[]> {
    //return this.products;
   return this.httpClient.get<getallprods[]>(this.REST_API_SERVER);
  }
 



  getSimillarProducts(): any {
    //return this.simillarProducts;
    this.httpClient.get(this.REST_API_SERVER);
  }

  public getSingleProduct(id: number): Observable<any> {
    let temp: any;
    // this.products.forEach(element => {
    //   if (element.id == id) {
    //         temp = element;
    //   }
    // });
    const loading = false;
    this.loadingService.progressEnable.next(loading);
    return new Observable((observer) => observer.next(temp));
  }
}



// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from "@angular/common/http";

// import {  throwError } from 'rxjs';
// import { retry, catchError } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {

//   private REST_API_SERVER = "http://localhost:3000/products";

//   constructor(private httpClient: HttpClient) { }

//   handleError(error: HttpErrorResponse) {
//     let errorMessage = 'Unknown error!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side errors
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Server-side errors
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     window.alert(errorMessage);
//     return throwError(errorMessage);
//   }

//   public getAllProducts(){
//     return this.httpClient.get(this.REST_API_SERVER).pipe(catchError(this.handleError));
//   }
// }
