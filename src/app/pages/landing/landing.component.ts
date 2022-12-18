import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  ticker: string
  tickerArray: string[] = [];

  addTickerToList() {
    if (this.ticker) {
      this.tickerArray.push(this.ticker);
      let tickers: string = '';
      this.tickerArray.forEach((element) => {
        tickers += element + ',';
      });
      alert(tickers);
      this.ticker = '';
    }
  }
}
