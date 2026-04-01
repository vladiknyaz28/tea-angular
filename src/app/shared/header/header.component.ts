import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchValue = '';

  constructor(
    private router: Router,
    private searchService: SearchService
  ) {
    this.searchValue = this.searchService.getSearchValue();
  }

  onSearch(): void {
    const value = this.searchValue.trim();
    this.searchService.setSearchValue(value);
    this.router.navigate(['/catalog']);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.searchService.clearSearch();
    this.router.navigate(['/catalog']);
  }
}
