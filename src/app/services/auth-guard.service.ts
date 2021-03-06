import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AppState, selectCustomerIsAuthenticated } from "../store";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.store.select(selectCustomerIsAuthenticated).pipe(
            map(authenticated => {
                if (!authenticated) {
                    this.router.navigateByUrl('/login');
                }

                return authenticated;
            })
        );
    }
}