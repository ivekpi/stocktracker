import {Component, OnInit} from '@angular/core';
import {FinhubService} from '../../services/finhub.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {StockSentimentUiData} from '../../components/model/stock-sentiment-uidata';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {
  stockSentiment: StockSentimentUiData;

  constructor(private finhubService: FinhubService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const routeParam = params.get('symbol');
      if (routeParam) {
        this.finhubService.getSentimentData(routeParam).subscribe(stockSentiment => this.stockSentiment = stockSentiment);
      }
    });
  }

}
