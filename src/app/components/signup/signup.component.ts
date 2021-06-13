import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Customer } from "src/app/models";
import { AppState, selectCustomer } from "src/app/store";
import { signUp } from "src/app/store/actions/customer.actions";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  customerInfo$ = this.store.select(selectCustomer);

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.minLength(2)],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  signup(): void {
    const customer: Customer = { ...this.signupForm.value };
    this.store.dispatch(signUp({ customer }));
  }
}
