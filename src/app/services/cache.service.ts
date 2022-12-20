import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly localStorageItemKey = 'tickers';
  private tickerArray = new Subject<string[]>();
  tickerArray$ = this.tickerArray.asObservable();

  getTickers(): string[] {
    const symbols = JSON.parse(localStorage.getItem(this.localStorageItemKey) || '[]');
    if (Array.isArray(symbols)) {
      return symbols;
    } else {
      localStorage.setItem(this.localStorageItemKey, '[]');
      return [];
    }
  }

  storeTicker(ticker: string): string[] {
    let tickers = [...this.getTickers(), ticker];
    localStorage.setItem(this.localStorageItemKey, JSON.stringify(tickers));
    return tickers;
  }

  removeTicker(ticker: string) {
    const filteredTicker = this.getTickers().filter(savedTicker => savedTicker !== ticker);
    localStorage.setItem(this.localStorageItemKey, JSON.stringify(filteredTicker));
    this.tickerArray.next(filteredTicker);
  }

}
