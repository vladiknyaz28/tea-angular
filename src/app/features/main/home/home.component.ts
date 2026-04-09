import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isPopupVisible = false;
  private popupSubscription: Subscription | null = null;

  images = [
    'assets/images/Баннер1_1.png',
    'assets/images/Баннер2.png',
    'assets/images/Баннер3.png'
  ];

  openItem = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.popupSubscription = timer(10000).subscribe(() => {
      this.isPopupVisible = true;
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
  }
}
