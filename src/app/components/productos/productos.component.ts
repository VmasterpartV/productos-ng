import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  products: any[] = [];

  constructor(
    public productosService: ProductosService,
    public carritoService: CarritoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productosService.getProducts().subscribe((result: any) => {
      console.log(result);
      this.products = result['products'];
    });
  }

  getWholeStarArray(rating: number): any[] {
    const wholeStars = Math.floor(rating);
    return new Array(wholeStars);
  }

  hasPartialStar(rating: number): boolean {
    const decimalPart = rating % 1;
    return decimalPart !== 0;
  }

  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    }
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  addToCart(product: any) {
    this.carritoService.agregarCarrito(product);
  }
}
