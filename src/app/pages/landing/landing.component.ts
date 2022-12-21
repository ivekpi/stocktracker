import { Component } from '@angular/core';
import {CacheService} from '../../services/cache.service';
import {FinhubService} from '../../services/finhub.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  ticker: string;
  tickerArray: string[];

  constructor(private cacheService : CacheService, private finhubService : FinhubService) {
    this.tickerArray = cacheService.getTickers();
    cacheService.tickerArray$.subscribe(
      tickerArray => {
        this.tickerArray = tickerArray;
      });
  }

  addTickerToList() {
    if (this.ticker) {
      this.finhubService.getStockProfile(this.ticker).subscribe((stockProfile) => {
        if (stockProfile && stockProfile.name) {
          this.tickerArray = this.cacheService.storeTicker(this.ticker);
        } else {
          alert("Stock with ticker " + this.ticker + " does not exist!!");
        }
        this.ticker = '';
      })
    }
  }
}
