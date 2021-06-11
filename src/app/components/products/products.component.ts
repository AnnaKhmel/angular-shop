import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { AppState, selectCategories, selectCategory, selectGender, selectProducts } from 'src/app/store';
import { loadCategories } from 'src/app/store/actions/categories.actions';
import { setCategory, setGender } from 'src/app/store/actions/filter.actions';
import { Category, Gender } from 'src/app/models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  category$ = this.store.select(selectCategory);
  categories$ = this.store.select(selectCategories);
  products$ = this.store.select(selectProducts);
  gender$ = this.store.select(selectGender).pipe(
    tap(gender => this.store.dispatch(loadCategories({ gender })))
  );

  genders = [
    Gender.men,
    Gender.women,
    Gender.unisex,
    Gender.boys,
    Gender.girls
  ];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onGenderClick(gender: Gender) {
    this.store.dispatch(setGender({ gender }));
  }

  onCategoryClick(category: Category) {
    this.store.dispatch(setCategory({ categoryId: category.id }));
  }
}
