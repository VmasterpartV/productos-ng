import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { offset } from '@popperjs/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url = 'https://dummyjson.com/products'
  limit = 12;
  skip = 0;

  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.url + `?limit=${this.limit}&skip=${this.skip}`);
  }

  getProduct(id: string) {
    return this.http.get(this.url + `/${id}`);
  }

  getMoreProducts() {
    this.skip += this.limit;
    return this.http.get(this.url + `?limit=${this.limit}&skip=${this.skip}`);
  }
}
