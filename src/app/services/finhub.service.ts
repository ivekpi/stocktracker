import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, forkJoin, map, mergeMap, Observable} from 'rxjs';
import {StockQuote} from '../../../model/stock-quote';
import {StockProfile} from '../../../model/stock-profile';
import {StockUIData} from '../../../model/stock-uidata';
import {StockSentimentData} from '../../../model/stock-sentiment-data';

@Injectable({
  providedIn: 'root'
})
export class FinhubService {
  private static readonly API_KEY =  {
    'token': 'bu4f8kn48v6uehqi3cqg'
  };
  private static readonly QUOTE_URI = 'https://finnhub.io/api/v1/quote';
  private static readonly COMPANY_NAME_URI = 'https://finnhub.io/api/v1/stock/profile2';
  private static readonly SENTIMENT_URI = 'hhttps://finnhub.io/api/v1/stock/insider-sentiment';

  constructor(public httpClient: HttpClient) { }

  getStockUiData(symbol: string): Observable<StockUIData> {
    let stockQuote = this.httpClient.get(FinhubService.QUOTE_URI, {params: {...FinhubService.API_KEY, symbol}});
    let stockProfile = this.httpClient.get(FinhubService.COMPANY_NAME_URI, {params: {...FinhubService.API_KEY, symbol}});
    return forkJoin([stockQuote, stockProfile]).pipe(map(([stockQuoteResponse, stockProfileResponse]) => {
      let quote = stockQuoteResponse as StockQuote;
      let profile = stockProfileResponse as StockProfile;
      return {
        companyName: profile.name,
        changeToday: quote.dp,
        openingPrice: quote.o,
        currentPrice: quote.c,
        highPrice: quote.h
      };
    }));
  }

  getSentimentData(symbol: string): Observable<StockSentimentData> {
    let from = '2022-08-18';
    let to = '2022-12-18';
    return this.httpClient.get(FinhubService.SENTIMENT_URI, {params: {...FinhubService.API_KEY, symbol, from, to}})
      .pipe(
        map((response) => {
          let sentiment = response as StockSentimentData;
          return sentiment;
        })
      )
    ;
  }
}
