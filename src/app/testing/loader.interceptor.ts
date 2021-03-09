
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from "@angular/router";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(
        private ngxService: NgxUiLoaderService,
        private router: Router
    ) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.ngxService.start()
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       

        if(!req.url.includes('myname=1')){
            this.ngxService.start();

           
        }
           
       
      console.log('reqqq', req)
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (evt.body.status == 401) {
                        this.router.navigate(['/'])
                    }

                }
            }),
            finalize(() => this.ngxService.stop())
        );
    }
}