import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.uri}/products`);
  }
  getProductById(id) {
    return this.http.get(`${this.uri}/product/${id}`);
  }
  addProduct(name, description, price, stock) {
    const product = {
      name: name,
      description: description,
      price: price,
      stock: stock
    }
    return this.http.post(`${this.uri}/products/add`, product);
  }
  updateProduct(id, name, description, price, stock) {
    const product = {
      name: name,
      description: description,
      price: price,
      stock: stock
    }
    return this.http.post(`${this.uri}/products/update/${id}`, product);
  }
  deleteProduct(id){
    return this.http.get(`${this.uri}/products/delete/${id}`);
  }

}
