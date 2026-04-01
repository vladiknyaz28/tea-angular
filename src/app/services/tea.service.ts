import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeaType } from '../types/tea.type';

@Injectable({
  providedIn: 'root'
})
export class TeaService {

  constructor(private http: HttpClient) { }

  getTeas(): Observable<TeaType[]> {
    return this.http.get<TeaType[]>('https://testologia.ru/tea');
  }

  getTea(id: number): Observable<TeaType> {
    return this.http.get<TeaType>('https://testologia.ru/tea', {
      params: { id: id.toString() }
    });
  }

  createOrder(data: {
    name: string;
    last_name: string;
    phone: string;
    country: string;
    zip: string;
    product: string;
    address: string;
    comment: string;
  }): Observable<{ success: number }> {
    return this.http.post<{ success: number }>('https://testologia.ru/order-tea', data);
  }

  getTeasBySearch(search: string): Observable<TeaType[]> {
    return this.http.get<TeaType[]>('https://testologia.ru/tea', {
      params: { search }
    });
  }
}
