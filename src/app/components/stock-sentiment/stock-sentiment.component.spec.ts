import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSentimentComponent } from './stock-sentiment.component';

describe('StockSentimentComponent', () => {
  let component: StockSentimentComponent;
  let fixture: ComponentFixture<StockSentimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSentimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockSentimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
