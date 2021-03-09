import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()

export class DataService {
    data:any = {venueCity:null,  latitude:null, longitude:null, timezone:null}
    private messageSource = new BehaviorSubject(this.data);
    currentMessage = this.messageSource.asObservable();
    constructor() { }
    changeMessage(data: any) {
        this.messageSource.next(data)
    }
}