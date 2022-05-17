import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { LoginUser } from '../models/login-user';
import { Shops } from '../models/shops';
import { ApiService } from '../services/api.service';
import { Products } from '../models/products';
import { filter, forkJoin, map, mergeMap, Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CommonComponent } from '../models/common.component';
import { CanDeactivateService } from '../services/popup-services/confirmation-popup.service';

@Component({
  selector: 'app-user-logged',
  templateUrl: './user-logged.component.html',
  styleUrls: ['./user-logged.component.css'],
})
export class UserLoggedComponent extends CommonComponent implements OnInit {
  selectedShop = new Shops();
  user: LoginUser = new LoginUser();
  shopsData: Array<Shops> = new Array<Shops>();
  productsData: Array<Products> = new Array<Products>();
  spinnerVisible: boolean = true;
  radioValue: string = '';
  filterQuery: string = '';
  priceGreaterThen!: number;
  priceLesserThen!: number;
  intialQuery: string = '';
  @ViewChildren('products') viewChildren!: QueryList<ElementRef>;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private canDeactivatePopupService: CanDeactivateService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getShopsWithProducts1().subscribe((x) => {
      this.shopsData = x;
      this.spinnerVisible = false;
      this.selectedShop = this.shopsData[0];
      this.productsData = this.shopsData[0].Products;
      setTimeout(() => {
        let productList = this.viewChildren.toArray();
        productList.forEach((product) => {
          product.nativeElement.classList.add('color-switch');
        });
      });
    });

    this.getOddShopProducts().subscribe((x) => {
      // console.log(x);
    });
  }

  ngAfterViewInit(): void {}

  getUserInfo() {
    this.authService.getLoggedUser().subscribe((x) => {
      // this.user = x;
      console.log(this.user.UserName);
    });
  }

  filterProducts() {
    let filteredCopy = this.selectedShop.Products;
    filteredCopy = this.filterProductsByName(filteredCopy);
    filteredCopy = this.filterProductsByPrice(filteredCopy);
    filteredCopy = this.filterProductsByOddEven(filteredCopy);
    this.productsData = filteredCopy;
  }

  filterProductsByName(list: Array<Products>): Array<Products> {
    if (!this.filterQuery) {
      return list;
    }
    let result = list.filter((x) =>
      x.Name.toLowerCase().includes(this.filterQuery.toLowerCase())
    );
    return result;
  }

  public override canLogout(): boolean {
    if (this.intialQuery !== this.filterQuery) {
      return false;
    }

    return true;
  }
  filterProductsByPrice(list: Array<Products>): Array<Products> {
    let result = list;

    if (this.priceGreaterThen) {
      result = result.filter((x) => x.Price.Value > this.priceGreaterThen);
    }

    if (this.priceLesserThen) {
      result = result.filter((x) => x.Price.Value < this.priceLesserThen);
    }

    return result;
  }

  filterProductsByOddEven(list: Array<Products>): Array<Products> {
    if (this.radioValue == 'even') {
      return list.filter((x) => x.Id % 2 == 0);
    }
    if (this.radioValue == 'odd') {
      return list.filter((x) => x.Id % 2 !== 0);
    }

    return list;
  }

  showShopProducts(event: any) {
    let numberId = event.target.value;
    let item = this.shopsData.find((shop) => shop.Id == numberId) as Shops;
    this.selectedShop = item;
    this.productsData = this.selectedShop.Products;
  }

  getShopsWithProducts1(): Observable<Array<Shops>> {
    return this.apiService.getShops().pipe(
      mergeMap((x) => {
        let shopsData = x;

        let response: Array<Observable<any>> = [];
        shopsData.forEach((shop) => {
          response.push(
            this.apiService.getShopProducts(shop.Id).pipe(
              map((x) => {
                shop.Products = x;
              })
            )
          );
        });
        return forkJoin(response).pipe(
          map(() => {
            return shopsData;
          })
        );
      })
    );
  }

  // getProductForFirstShop(): Observable<Products> {
  //   return this.auth.getShops().pipe(
  //     mergeMap((shop) => {
  //       let firstShop = shop[0];
  //       return this.auth.getShopProducts(firstShop.Id).pipe(
  //         mergeMap((product) => {
  //           return this.auth.getProductsById(product[0].Id).pipe(
  //             map((x) => {
  //               return x;
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // }

  //prvi shop koji ima neparni id dovuci mu producte, i onda uzmi prvi product koji ima neparni id i dovuci detalje tog producta

  // getOddShopProduct(): Observable<Products | null> {
  //   return this.auth.getShops().pipe(
  //     mergeMap((shops) => {
  //       let oddShop = shops.find((shop) => {
  //         return shop.Id % 2 !== 0;
  //       });
  //       if (!oddShop) {
  //         return of(null);
  //       }
  //       return this.auth.getShopProducts(oddShop.Id).pipe(
  //         mergeMap((products) => {
  //           let oddProduct = products.find((product) => {
  //             return product.Id % 2 !== 0;
  //           });
  //           if (!oddProduct) {
  //             return of(null);
  //           }
  //           return this.auth.getProductsById(oddProduct.Id).pipe(
  //             map((product) => {
  //               return product;
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // }

  getOddShopProducts(): Observable<Array<Products> | null> {
    return this.apiService.getShops().pipe(
      mergeMap((shops) => {
        let oddShop = shops.find((shop) => {
          return shop.Id % 2 !== 0;
        });
        if (!oddShop) {
          return of(null);
        }
        return this.apiService.getShopProducts(oddShop.Id).pipe(
          mergeMap((products) => {
            let oddProducts = products.filter((product) => {
              return product.Id % 2 !== 0;
            });
            if (!oddProducts) {
              return of(null);
            }

            let response = new Array<Observable<Products>>();
            oddProducts.forEach((product) => {
              response.push(this.apiService.getProductsById(product.Id));
            });
            return forkJoin(response).pipe(
              map((x) => {
                return x;
              })
            );
          })
        );
      })
    );
  }
  getOddShop(): Observable<Shops | null> {
    return this.apiService.getShops().pipe(
      mergeMap((shops) => {
        let oddShop = shops.find((shop) => {
          return shop.Id % 2 !== 0;
        });
        if (!oddShop) {
          return of(null);
        }
        return this.apiService.getShopProducts(oddShop.Id).pipe(
          mergeMap((products) => {
            let oddProducts = products.filter((product) => {
              return product.Id % 2 !== 0;
            });
            if (oddProducts.length == 0) {
              return of(null);
            }
            let response = new Array<Observable<void>>();
            oddProducts.forEach((product) => {
              response.push(
                this.apiService.getProductsById(product.Id).pipe(
                  map((x) => {
                    oddShop!.Products.push(x);
                  })
                )
              );
            });

            return forkJoin(response).pipe(
              map((x) => {
                return oddShop!;
              })
            );
          })
        );
      })
    );
  }

  // getProductForFirstShop1(): Observable<Products> {
  //   return this.auth.getShops().pipe(
  //     mergeMap((shop) => {
  //       let firstShop = shop[0];
  //       return this.auth.getShopProducts(firstShop.Id).pipe(
  //         mergeMap((product) => {
  //           return this.auth.getProductsById(product[0].Id).pipe(
  //             map((x) => {
  //               return x;
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // }

  //map
  //mergeMap

  // aca() {
  //   this.test().subscribe((x) => {
  //     console.log(x);
  //   });
  // }

  // test(): Observable<boolean> {
  //   let response = of('petar').pipe(
  //     mergeMap((rec) => {
  //       let listaRezultata = new Array<string>();
  //       let listaPoziva = [];

  //       for (let i = 0; i < rec.length; i++) {
  //         let slovo = rec[i];
  //         let pozivKojiGuraUListuZaSlovoDaljeParanIliNe = this.vratiBroj(
  //           slovo
  //         ).pipe(
  //           map((x) => {
  //             let rezultat = '';
  //             if (x % 2 == 0) {
  //               rezultat = 'paran';
  //             } else {
  //               rezultat = 'neparan';
  //             }
  //             listaRezultata.push(rezultat);
  //           })
  //         );
  //         listaPoziva.push(pozivKojiGuraUListuZaSlovoDaljeParanIliNe);
  //       }
  //       return forkJoin(listaPoziva).pipe(
  //         map(() => {
  //           let brojParnih = listaRezultata.filter((x) => x == 'paran');
  //           let brojNeparnih = listaRezultata.filter((x) => x == 'neparan');
  //           return brojParnih > brojNeparnih;
  //         })
  //       );
  //     })
  //   );
  //   return response;
  // }

  // vratiBroj(slovo: string): Observable<number> {
  //   let result;
  //   switch (slovo) {
  //     case 'a':
  //       result = 1;
  //       break;
  //     case 'p':
  //       result = 2;
  //       break;
  //     case 'g':
  //       result = 3;
  //       break;
  //     default:
  //       result = 15;
  //       break;
  //   }
  //   return of(result);
  // }
}
