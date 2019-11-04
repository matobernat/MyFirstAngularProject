import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';


import { IProduct } from './product';
import { ConstantPool } from '@angular/compiler';
import { TouchSequence } from 'selenium-webdriver';


@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    filteredProducts: IProduct[];
    products: IProduct[];
    errorMessage: string;

    constructor(private productService: ProductService){

    }




    private _listFilter: string;
    public get listFilter(): string {
      return this._listFilter;
    }

    public set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts= this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }




    onRatingClicked(message: string): void{
      this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string) : IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1)
    }

    toggleImage(): void{
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      console.log("ngOnInit");
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      })
    }
}