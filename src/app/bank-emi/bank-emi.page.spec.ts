import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankEmiPage } from './bank-emi.page';

describe('BankEmiPage', () => {
  let component: BankEmiPage;
  let fixture: ComponentFixture<BankEmiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BankEmiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
