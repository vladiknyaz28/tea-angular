import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeaService } from 'src/app/services/tea.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  orderSuccess = false;
  orderError = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private teaService: TeaService
  ) {}

  ngOnInit(): void {
    const encodedProduct = this.route.snapshot.paramMap.get('product') ?? '';
    const productTitle = decodeURIComponent(encodedProduct);

    this.orderForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zА-Яа-яЁё]+$/)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zА-Яа-яЁё]+$/)
        ]
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+?\d{11}$/)
        ]
      ],
      country: ['', [Validators.required]],
      zip: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Za-zА-Яа-яЁё0-9\s\-\/]+$/)
        ]
      ],
      product: [{ value: productTitle, disabled: true }],
      comment: ['']
    });
  }

  get f() {
    return this.orderForm.controls;
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.orderError = false;
    this.isSubmitting = true;

    const formValue = this.orderForm.getRawValue();

    const orderData = {
      name: formValue.firstName,
      last_name: formValue.lastName,
      phone: formValue.phone,
      country: formValue.country,
      zip: formValue.zip,
      product: formValue.product,
      address: formValue.address,
      comment: formValue.comment
    };

    this.teaService.createOrder(orderData).subscribe({
      next: (response) => {
        this.isSubmitting = false;

        if (response.success === 1) {
          this.orderSuccess = true;
        } else {
          this.orderError = true;
        }
      },
      error: () => {
        this.isSubmitting = false;
        this.orderError = true;
      }
    });
  }
}
