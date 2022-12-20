import {Component, Input} from '@angular/core';
import {StockSentimentUiData} from '../model/stock-sentiment-uidata';

@Component({
  selector: 'app-stock-sentiment',
  templateUrl: './stock-sentiment.component.html',
  styleUrls: ['./stock-sentiment.component.scss']
})
export class StockSentimentComponent {
  @Input() stockSentimentUiData: StockSentimentUiData;

}
