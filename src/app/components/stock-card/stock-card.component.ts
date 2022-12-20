import {Component, Input, OnInit} from '@angular/core';
import {FinhubService} from '../../services/finhub.service';
import {StockUIData} from '../../../../model/stock-uidata';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input() stockTicker: string;
  stockUIData: StockUIData;

  constructor(public finhubService: FinhubService) {
  }

  ngOnInit(): void {
    this.finhubService.getStockUiData(this.stockTicker).subscribe(stockUIData => this.stockUIData = stockUIData);
  }
}
