import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.scss']
})
export class DetallesProductoComponent {

  productId: string = '';
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    public productosService: ProductosService,
    public carritoService: CarritoService
  ) {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.getProduct();
    });
  }

  getProduct() {
    this.productosService.getProduct(this.productId).subscribe((result: any) => {
      console.log(result);
      this.product = result;
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

  addToCart(product: any) {
    this.carritoService.agregarCarrito(product);
  }
}
