import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsModule } from './modules/products/products.module';
import { reducers } from './store';
import { ShopEffects } from './store/shop.effects';
import { CartModalContent } from './components/cart-modal-content/cart-modal-content.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartModalContent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ProductsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ShopEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
