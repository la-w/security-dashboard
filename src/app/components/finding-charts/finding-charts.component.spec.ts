import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingChartsComponent } from './finding-charts.component';

describe('FindingChartsComponent', () => {
  let component: FindingChartsComponent;
  let fixture: ComponentFixture<FindingChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindingChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindingChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
