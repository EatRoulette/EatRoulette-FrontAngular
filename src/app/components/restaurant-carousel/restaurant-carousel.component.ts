import { Component, OnInit, ViewChild } from '@angular/core';
import {CarouselComponent} from "angular2-carousel";


@Component({
  selector: 'app-restaurant-carousel',
  templateUrl: './restaurant-carousel.component.html',
  styleUrls: ['./restaurant-carousel.component.css']
})

export class RestaurantCarouselComponent implements OnInit {
  @ViewChild('topCarousel') topCarousel: CarouselComponent;
  
  constructor() {
     
   }

  ngOnInit(): void {
  }
  fooNextSlide() {
    this.topCarousel.slideNext();
  }
}
