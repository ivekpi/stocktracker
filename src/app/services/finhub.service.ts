import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable} from 'rxjs';
import {StockQuote} from '../components/model/stock-quote';
import {StockProfile} from '../components/model/stock-profile';
import {StockUIData} from '../components/model/stock-uidata';
import {MonthlyStockSentiment, StockSentiment} from '../components/model/stock-sentiment';
import {StockSentimentUiData} from '../components/model/stock-sentiment-uidata';
import {DatePipe} from '@angular/common';
import {MonthlySentiment} from '../components/model/monthly-sentiment';

@Injectable({
  providedIn: 'root'
})
export class FinhubService {
  private static readonly DATE_FORMAT = 'YYYY-MM-dd';
  private static readonly API_KEY =  {
    'token': 'bu4f8kn48v6uehqi3cqg'
  };
  private static readonly QUOTE_URI = 'https://finnhub.io/api/v1/quote';
  private static readonly COMPANY_NAME_URI = 'https://finnhub.io/api/v1/stock/profile2';
  private static readonly SENTIMENT_URI = 'https://finnhub.io/api/v1/stock/insider-sentiment';

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

  getSentimentData(symbol: string): Observable<StockSentimentUiData> {
    const datepipe: DatePipe = new DatePipe('en-US')
    const currentDate = new Date();
    let to = datepipe.transform(currentDate, FinhubService.DATE_FORMAT) || '';
    let from = datepipe.transform(currentDate.setMonth(currentDate.getMonth() - 3), FinhubService.DATE_FORMAT) || '';
    let stockSentiment = this.httpClient.get(FinhubService.SENTIMENT_URI, {params: {...FinhubService.API_KEY, symbol, from, to}});
    let stockProfile = this.httpClient.get(FinhubService.COMPANY_NAME_URI, {params: {...FinhubService.API_KEY, symbol}});
    return forkJoin([stockSentiment, stockProfile])
      .pipe(
        map(([responseSentiment, stockProfileResponse]) => {
          let sentiment = responseSentiment as StockSentiment;
          let profile = stockProfileResponse as StockProfile;
          let sentimentUi = {} as StockSentimentUiData;
          let monthlySentiments = [] as MonthlySentiment[];
          sentimentUi.companyName = profile.name;
          sentimentUi.companyTicker = symbol;

          sentiment.data.forEach((value: MonthlyStockSentiment) => {
            const date = new Date(value.year, value.month);
            const monthName = date.toLocaleString('default', { month: 'long' });
            monthlySentiments.push({
              month: monthName,
              change: value.change,
              mspr: value.mspr
            })
          });
          sentimentUi.monthlySentiments = monthlySentiments;
          return sentimentUi;
        })
      )
      ;
  }
}
