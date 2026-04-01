import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeaService } from 'src/app/services/tea.service';
import { SearchService } from 'src/app/services/search.service';
import { TeaType } from 'src/app/types/tea.type';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  teas: TeaType[] = [];
  isLoading = false;
  searchValue = '';
  title = 'Наши чайные коллекции';

  private searchSubscription!: Subscription;

  constructor(
    private teaService: TeaService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchService.searchValue$.subscribe((value: string) => {
      this.searchValue = value.trim();
      this.title = this.searchValue
        ? `Результаты поиска по запросу "${this.searchValue}"`
        : 'Наши чайные коллекции';

      this.loadTeas();
    });
  }

  loadTeas(): void {
    this.isLoading = true;

    const request$ = this.searchValue
      ? this.teaService.getTeasBySearch(this.searchValue)
      : this.teaService.getTeas();

    request$.subscribe({
      next: (data: TeaType[]) => {
        this.teas = data;
        this.isLoading = false;
      },
      error: () => {
        this.teas = [];
        this.isLoading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchService.clearSearch();
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
