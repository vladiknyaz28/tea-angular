import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeaService } from 'src/app/services/tea.service';
import { TeaType } from 'src/app/types/tea.type';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  tea: TeaType | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teaService: TeaService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id !== null) {
      this.teaService.getTea(id).subscribe((data: TeaType) => {
        this.tea = data;
      });
    }
  }

  onBuy(): void {
    if (!this.tea) {
      return;
    }

    const encodedTitle = encodeURIComponent(this.tea.title);

    this.router.navigate(['/order', encodedTitle]);
  }

}
