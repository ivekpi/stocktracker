import { Injectable } from '@angular/core';
import {tick} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly localStorageItemKey = 'tickers';
  private _tickerArray: string[] = [];

  constructor() { }

  getTickers() {
    let simibi = localStorage.getItem(this.localStorageItemKey) || '[]';
    const symbols = JSON.parse(simibi);
    if (Array.isArray(symbols)) {
      return symbols;
    } else {
      localStorage.setItem(this.localStorageItemKey, '[]');
      return [];
    }
  }

  get tickerArray(): string[] {
    return this._tickerArray;
  }

  storeTicker(ticker: string) {
    let tickers = [...this.getTickers(), ticker];
    localStorage.setItem(this.localStorageItemKey, JSON.stringify(tickers));
    return tickers;
  }

  // removeTicker(ticker: string) {
  //   this._tickerArray.
  // }
}
