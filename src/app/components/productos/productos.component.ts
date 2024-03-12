import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  products: any[] = [];

  constructor(public productosService: ProductosService) { }

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
}
