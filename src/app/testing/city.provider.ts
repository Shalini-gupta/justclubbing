import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CityProvider {
    constructor(){}
    // city = localStorage.getItem('city') ? localStorage.getItem('city') : 'Perth'
    // lat = localStorage.getItem('lat')? localStorage.getItem('lat') : '-31.953512'
    // long = localStorage.getItem('long') ? localStorage.getItem('long'): '115.857048'

    city = localStorage.getItem('city')
    lat = localStorage.getItem('lat')
    long = localStorage.getItem('long')
    timezone = localStorage.getItem('timezone')
}