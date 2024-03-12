import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  listaCarrito: any[] = [];

  constructor() {
    const carrito = localStorage.getItem('carrito');
    if (carrito) {
      this.listaCarrito = JSON.parse(carrito);
    } else {
      this.listaCarrito = [];
    }
    console.log(this.listaCarrito);
  }

  agregarCarrito(producto: any) {
    const index = this.listaCarrito.findIndex((item) => item.id === producto.id);
    if (index !== -1) {
      if (this.listaCarrito[index].cantidad >= producto.stock) {
        alert('No hay suficiente stock');
        return;
      }
      this.listaCarrito[index].cantidad += 1;
      localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
      alert('Se ha agregado una unidad al carrito');
      console.log(this.listaCarrito);
      return;
    }
    producto.cantidad = 1;
    this.listaCarrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
    alert('Se ha agregado al carrito');
    console.log(this.listaCarrito);
  }

  getCarrito() {
    return this.listaCarrito;
  }

  removerDelCarrito(producto: any) {
    const index = this.listaCarrito.findIndex((item) => item.id === producto.id);
    if (index !== -1) {
      this.listaCarrito.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
    }
  }
  
  actualizarCarrito(carrito: any[]) {
    this.listaCarrito = carrito;
    localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
  }
}
