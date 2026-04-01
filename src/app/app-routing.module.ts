import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ProductComponent } from './pages/product/product.component';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },           // Главная
  { path: 'catalog', component: CatalogComponent }, // Каталог
  { path: 'product/:id', component: ProductComponent }, // Страница товара
  { path: 'order/:product', component: OrderComponent },     // Оформление заказа
  { path: '**', redirectTo: '' }                    // На всякий случай
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
