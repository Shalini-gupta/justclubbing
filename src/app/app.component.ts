import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var window
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clubbing-app';
  constructor(private router: Router){}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // this.latitude =  position.coords.latitude
        // this.longitude =  position.coords.longitude
        localStorage.setItem('currentLat', (position.coords.latitude).toString())
        localStorage.setItem('currentLong',position.coords.longitude.toString())
      });
    }
  }
}
