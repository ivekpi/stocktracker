import {Component, Input, OnInit} from '@angular/core';
import {FinhubService} from '../../services/finhub.service';
import {StockUIData} from '../model/stock-uidata';
import {CacheService} from '../../services/cache.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input() stockTicker: string;
  stockUIData: StockUIData;
  numberSign: string;

  constructor(public finhubService: FinhubService, private cacheService: CacheService) {
  }

  ngOnInit(): void {
    this.finhubService.getStockUiData(this.stockTicker).subscribe(stockUIData => {
      this.stockUIData = stockUIData;
      if (this.stockUIData.changeToday > 0) {
        this.numberSign = '+';
      }
    });
  }

  closeStockCard() {
    this.cacheService.removeTicker(this.stockTicker);
  }
}
