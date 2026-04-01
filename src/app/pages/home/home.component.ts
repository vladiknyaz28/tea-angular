import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  isPopupVisible = false;
  private popupSubscription: Subscription | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.popupSubscription = timer(10000).subscribe(() => {
      this.isPopupVisible = true;
    });
  }

  ngAfterViewInit(): void {
    $('.hero-slider').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      prevArrow: '<button type="button" class="slick-prev">&#10094;</button>',
      nextArrow: '<button type="button" class="slick-next">&#10095;</button>'
    });
  }

  goToCatalog(): void {
    this.isPopupVisible = false;
    this.router.navigate(['/catalog']);
  }

  closePopup(): void {
    this.isPopupVisible = false;
  }

  ngOnDestroy(): void {
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }

    if ($('.hero-slider').hasClass('slick-initialized')) {
      $('.hero-slider').slick('unslick');
    }
  }
}
