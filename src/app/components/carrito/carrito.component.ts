import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];

  constructor(
    public carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.getCarrito();
  }

  getCarrito() {
    this.carrito = this.carritoService.getCarrito();
  }

  removerDelCarrito(product: any) {
    this.carritoService.removerDelCarrito(product);
  }

  calcularTotalGlobal(): number {
    let total = 0;
    for (let item of this.carrito) {
      total += item.price * item.cantidad;
    }
    return total;
  }

  addOne(product: any) {
    this.carritoService.agregarCarrito(product);
    this.getCarrito();
  }

  quitOne(product: any) {
    const index = this.carrito.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      if (this.carrito[index].cantidad > 1) {
        this.carrito[index].cantidad -= 1;
        this.carritoService.actualizarCarrito(this.carrito);
        this.getCarrito();
      }
    }
  }
}
