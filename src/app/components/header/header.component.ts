import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isConnected: boolean = false; // todo will have to change if connected

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigate(link: string){
    this.router.navigate([link])
  }

}
