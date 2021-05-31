import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { ProductsComponent } from './modules/products/components/products/products.component';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {path: '**', component: NotFoundPageComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
