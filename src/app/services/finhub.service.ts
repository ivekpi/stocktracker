import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, forkJoin, map, mergeMap, Observable} from 'rxjs';
import {StockQuote} from '../../../model/stock-quote';
import {StockProfile} from '../../../model/stock-profile';
import {StockUIData} from '../../../model/stock-uidata';

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

  getStockInfoSync(ticker: string): StockQuote {
    return {
      c: 111,
      dp: 111,
      h: 111,
      pc: 111,
      o: 111,
      l: 111,
      d: 111
    };
    // return {
    //   companyName: 'TESLA',
    //   c: 111,
    //   dp: 111,
    //   h: 111,
    //   pc: 111,
    //   o: 111,
    //   l: 111,
    //   d: 111
    // };
  }

  getStockInfo(symbol: string): Observable<StockUIData> {
    return this.httpClient.get(FinhubService.QUOTE_URI, {params: {...FinhubService.API_KEY, symbol}})
      .pipe(
        map((rawResponse) => {
          let stockQuote = rawResponse as StockQuote;

          // this.httpClient.get(FinhubService.COMPANY_NAME_URI, {params: {...FinhubService.API_KEY, symbol}})
          //   .pipe(
          //     map((response) => {
          //       let stockProfile = response as StockProfile;
          //       return {
          //         companyName: 'TSLA',
          //         highPrice: stockQuote.h,
          //         currentPrice: stockQuote.c,
          //         openingPrice: stockQuote.o,
          //         changeToday: stockQuote.dp/100
          //       }
          //     }
          //
          //   )
          //   )

          return {
            companyName: 'TSLA',
            highPrice: stockQuote.h,
            currentPrice: stockQuote.c,
            openingPrice: stockQuote.o,
            changeToday: stockQuote.dp/100
          }
        })
      )
    ;
    // return combineLatest([
    //   this.httpClient.get(FinhubService.QUOTE_URI, {params: {...FinhubService.API_KEY, ticker}}),
    //   this.httpClient.get(FinhubService.COMPANY_NAME_URI, {params: {...FinhubService.API_KEY, ticker}})
    // ]).pipe(
    //   map(([stock, company]) => {
    //     let stockish = {...stock, companyName: (company as StockQuote).companyName} as StockQuote;
    //     return stockish;
    //   })
    // );
  }

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

    // return this.httpClient.get(FinhubService.QUOTE_URI, {params: {...FinhubService.API_KEY, symbol}})
    //   .pipe(
    //     mergeMap((quoteResponse) => {
    //       let stockQuote = quoteResponse as StockQuote;
    //
    //       // this.httpClient.get(FinhubService.COMPANY_NAME_URI, {params: {...FinhubService.API_KEY, symbol}})
    //       //   .pipe(
    //       //     map((response) => {
    //       //       let stockProfile = response as StockProfile;
    //       //       return {
    //       //         companyName: 'TSLA',
    //       //         highPrice: stockQuote.h,
    //       //         currentPrice: stockQuote.c,
    //       //         openingPrice: stockQuote.o,
    //       //         changeToday: stockQuote.dp/100
    //       //       }
    //       //     }
    //       //
    //       //   )
    //       //   )
    //
    //       return {
    //         companyName: 'TSLA',
    //         highPrice: stockQuote.h,
    //         currentPrice: stockQuote.c,
    //         openingPrice: stockQuote.o,
    //         changeToday: stockQuote.dp/100
    //       }
    //     })
    //   )
    //   ;
  }
}
