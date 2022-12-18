import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, map, Observable} from 'rxjs';
import {StockInfo} from '../../../model/stock-info';

@Injectable({
  providedIn: 'root'
})
export class FinhubService {
  private static readonly API_KEY =  {
    'token': 'bu4f8kn48v6uehqi3cqg'
  };
  private static readonly QUOTE_URI = 'https://finnhub.io/docs/api/quote';
  private static readonly COMPANY_NAME_URI = 'https://finnhub.io/docs/api/symbol-search';
  private static readonly SENTIMENT_URI = 'https://finnhub.io/docs/api/insider-sentiment';

  constructor(private httpClient: HttpClient) { }

  getStockInfo(ticker: string): Observable<StockInfo> {
    return combineLatest([
      this.httpClient.get(FinhubService.QUOTE_URI, {params: {...FinhubService.API_KEY, ticker}}),
      this.httpClient.get(FinhubService.COMPANY_NAME_URI, {params: {...FinhubService.API_KEY, ticker}})
    ]).pipe(
      map(([stock, company]) => {
        return {...stock, companyName: (company as StockInfo).companyName} as StockInfo;
      })
    );
  }
}
