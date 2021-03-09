import { Component, OnInit,Input } from "@angular/core";
@Component({
    selector: 'app-clubAndBar',
    templateUrl: './clubAndBar.component.html',
    styleUrls: ['./clubAndBar.component.css']
})

export class ClubAndBarComponent implements OnInit {
    @Input() model: any; 
    @Input() data: any; 
    constructor() { }

    ngOnInit() {
        console.log('child', this.model.prop1)
        console.log('child 2', this.data)
        
    }
}