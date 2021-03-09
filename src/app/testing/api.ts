import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class Api {
    url = environment.url
    constructor(
        private http: HttpClient,
        private router: Router) { }

    post(url, data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            })
        };
        return this.http.post<any>(this.url + url, data, httpOptions)
            .pipe(
                tap(datas => this.checkAuth(datas)),
                catchError(this.handleError)
            );
    }

    postParam(url, data, params): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            }),
            params: params
        };
        return this.http.post<any>(this.url + url, data, httpOptions )
            .pipe(
                tap(datas => this.checkAuth(datas)),
                catchError(this.handleError)
            );
    }
    formData(url, data): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content': 'multipart/form-data',
                'Authorization': localStorage.getItem('token') || ''
            })
        };
        return this.http.post<any>(this.url + url, data, httpOptions)
            .pipe(
                tap(datas => this.checkAuth(datas)),
                catchError(this.handleError)
            );
    }
    get(url): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') || ''
            })
        };
        return this.http.get<any>(this.url + url, httpOptions)
            .pipe(
                tap(datas => this.checkAuth(datas)),
                catchError(this.handleError)
            );
    }

    getConfig(url): Observable<any> {
        return this.http.get<any>(url)
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            console.log({ error })
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };

    private checkAuth(data) {
        if(data.message == "Invalid Token"){
            localStorage.clear()
            this.router.navigate(['/usersignin'])
        }
    }
}