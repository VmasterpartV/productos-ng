import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Not enough stock!',
          footer: '<a href>Why do I have this issue?</a>'
        })
        return;
      }
      this.listaCarrito[index].cantidad += 1;
      localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(this.listaCarrito);
      return;
    }
    producto.cantidad = 1;
    this.listaCarrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
    Swal.fire({
      icon: 'success',
      title: 'Product added to cart!',
      showConfirmButton: false,
      timer: 1500
    })
    console.log(this.listaCarrito);
  }

  getCarrito() {
    return this.listaCarrito;
  }

  removerDelCarrito(producto: any) {
    Swal.fire({
      title: 'Are you sure you want to remove this product from the cart?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.listaCarrito.findIndex((item) => item.id === producto.id);
        if (index !== -1) {
          this.listaCarrito.splice(index, 1);
          localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
          Swal.fire({
            icon: 'success',
            title: 'Product removed from cart!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })
  }

  actualizarCarrito(carrito: any[]) {
    this.listaCarrito = carrito;
    localStorage.setItem('carrito', JSON.stringify(this.listaCarrito));
    Swal.fire({
      icon: 'success',
      title: 'Product removed from cart!',
      showConfirmButton: false,
      timer: 1500
    })
  }
}
