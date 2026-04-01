import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchValue$ = new BehaviorSubject<string>('');

  setSearchValue(value: string): void {
    this.searchValue$.next(value);
  }

  getSearchValue(): string {
    return this.searchValue$.value;
  }

  clearSearch(): void {
    this.searchValue$.next('');
  }
}
