import {MonthlySentiment} from './monthly-sentiment';

export interface StockSentimentUiData {
  companyName: string;
  companyTicker: string;
  monthlySentiments: MonthlySentiment[];
}
