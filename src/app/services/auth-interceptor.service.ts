import { Injectable } from "@angular/core";
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from "@angular/common/http";
import { first, mergeMap } from "rxjs/operators";

import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState, selectCustomerToken } from "../store";

@Injectable({
    providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private store: Store<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(selectCustomerToken).pipe(
            first(),
            mergeMap(token => {
                if (token) {
                    const clonedRequest = req.clone({
                        headers: req.headers.set("Authorization", "Bearer " + token)
                    });

                    return next.handle(clonedRequest);
                }

                return next.handle(req);
            })
        );
    }
}