import {Component, Input, OnInit} from '@angular/core';
import {FinhubService} from '../../services/finhub.service';
import {StockInfo} from '../../../../model/stock-info';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input() stockTicker: string;
  stockInfo: StockInfo;

  constructor(public finhubService: FinhubService) {
  }

  ngOnInit(): void {
    this.finhubService.getStockInfo(this.stockTicker).subscribe(stockInfo =>
      this.stockInfo = stockInfo
    )
  }


}
