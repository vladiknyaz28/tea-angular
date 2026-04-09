import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from '../../features/products/catalog/catalog.component';
import { ProductComponent } from '../../features/products/product/product.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CatalogComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    CatalogComponent,
    ProductComponent
  ]
})
export class ProductsModule { }
