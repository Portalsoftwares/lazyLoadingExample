import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CxResponse } from '../models/CxResponse';
import { LoginUser } from '../models/login-user';
import { Products } from '../models/products';
import { Shops } from '../models/shops';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  isCheckboxChecked: boolean = false;
  constructor(private http: HttpClient) {}

  getLoggedUser(): Observable<LoginUser> {
    return this.http
      .get<CxResponse<LoginUser>>(
        'https://bcd-api.procampaign.com/auth/UserInfo'
      )
      .pipe(
        map((res) => {
          return res.Data;
        })
      );
  }

  login(username: string, password: string): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let body = `grant_type=password&password=${password}&username=${username}`;
    return this.http.post<any>(
      'https://bcd-api.procampaign.com/auth/Token',
      body
    );
  }

  getShops(): Observable<Array<Shops>> {
    return this.http
      .get<CxResponse<Array<Shops>>>(
        'https://bcd-api.procampaign.com/eCommerce/Shops'
      )
      .pipe(
        map((res) => {
          return res.Data;
        })
      );
  }

  getShopProducts(shopId: number): Observable<Array<Products>> {
    return this.http
      .get<CxResponse<Array<Products>>>(
        `https://bcd-api.procampaign.com/eCommerce/Shops/${shopId}/Products`
      )
      .pipe(
        map((res) => {
          return res.Data;
        })
      );
  }

  getProductsById(productId: number): Observable<Products> {
    return this.http
      .get<CxResponse<Products>>(
        `https://bcd-api.procampaign.com/eCommerce/Products/${productId}`
      )
      .pipe(
        map((res) => {
          return res.Data;
        })
      );
  }
}
