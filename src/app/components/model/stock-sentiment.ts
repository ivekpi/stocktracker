export interface StockSentiment {
  symbol: string;
  data: MonthlyStockSentiment[];
}

export interface MonthlyStockSentiment {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
}
