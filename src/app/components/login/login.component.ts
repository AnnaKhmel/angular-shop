import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState, selectCustomer } from "src/app/store";
import { signIn } from "src/app/store/actions/customer.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  customerInfo$ = this.store.select(selectCustomer);

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const { email, password } = this.loginForm.value;
    this.store.dispatch(signIn({ email, password }));
  }
}