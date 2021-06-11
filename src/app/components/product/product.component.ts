import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Product } from 'src/app/models/product';
import { addItem } from 'src/app/store/actions/cart.actions';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;

  form: FormGroup;
  colors!: Array<{ color: string, disabled?: boolean }>;
  sizes!: Array<{ size: string, disabled?: boolean }>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {
    this.form = this.formBuilder.group({
      colors: ['', Validators.required],
      sizes: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.colors = [...new Set(this.product.options.map(o => o.color))]
      .map(color => ({ color }))

    this.sizes = [...new Set(this.product.options.map(o => o.size))]
      .map(size => ({ size }))
  }

  onAddToCartClicked(product: Product) {
    const color = this.form.get('colors')?.value;
    const size = this.form.get('sizes')?.value;

    const newProduct: Product = { 
      id: product.id,
      name: product.name,
      price: product.price,
      material: product.material,
      options: [{
        productId: product.id,
        color,
        size,
        gender: product.options[0].gender
      }]
    };

    const cartItem: CartItem = {
      product: newProduct,
      quantity: 1
    };

    this.store.dispatch(addItem({ cartItem }));
  }
}
