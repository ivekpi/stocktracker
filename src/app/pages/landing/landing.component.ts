import { Component } from '@angular/core';
import {CacheService} from '../../services/cache.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  ticker: string;
  tickerArray: string[];

  constructor(private cacheService : CacheService) {
    this.tickerArray = cacheService.getTickers();
    cacheService.tickerArray$.subscribe(
      tickerArray => {
        this.tickerArray = tickerArray;
      });
  }

  addTickerToList() {
    if (this.ticker) {
      let tickers: string = '';
      this.tickerArray.forEach((element) => {
        tickers += element + ',';
      });
      this.tickerArray = this.cacheService.storeTicker(this.ticker);
      this.ticker = '';
    }
  }
}
