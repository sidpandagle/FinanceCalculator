import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Share } from '@capacitor/share';
import { AdmobService } from '../services/admob.service';

@Component({
  selector: 'app-emi-calculator',
  templateUrl: './emi-calculator.page.html',
  styleUrls: ['./emi-calculator.page.scss'],
})
export class EmiCalculatorPage implements OnInit {

  emi: EMI;

  constructor(private adMobService: AdmobService) {
    this.emi = new EMI();
    this.adMobService.initialize();
  }


  ngOnInit() {
    this.emi.principle = 100000;
    this.emi.rateOfInterest = 5;
    this.emi.tenure = 2;
    this.emi.startDate = '2023-09-27';
    this.calculateMonthlyEMI();
  }

  calculateMonthlyEMI() {
    let interestPerMonth = this.getInterestPerMonth();
    let tenureInMonths = this.getTenureInMonths();
    let numerator = Number(this.emi.principle) * interestPerMonth * (1 + interestPerMonth) ** Number(tenureInMonths);
    let denominator = (1 + interestPerMonth) ** Number(tenureInMonths) - 1;
    this.emi.monthlyEMI = this.roundToDecimal(numerator / denominator, 2);
    this.emi.totalInterestForTheYear = this.getTotalInterestForTheYear();
    this.emi.endDate = moment(this.emi.startDate, 'YYYY-MM-DD').add(tenureInMonths, 'M').format('YYYY-MM-DD');
  }

  getTenureInMonths() {
    return this.emi.tenureType == 'Yearly' ? Number(this.emi.tenure) * 12 : Number(this.emi.tenure);
  }

  getInterestPerMonth() {
    let result = Number(this.emi.rateOfInterest) / 12 / 100;
    return this.roundToDecimal(result, 4);
  }

  roundToDecimal(value: number, decimal: number) {
    return Math.round((value + Number.EPSILON) * (10 ** decimal)) / (10 ** decimal);
  }

  getTotalInterestForTheYear() {
    let interestAmountPerMonth = this.getInterestPerMonth() * Number(this.emi.principle);
    let tenure = this.getTenureInMonths();
    let totalInterestForTheYear = 0;

    while (tenure--) {
      totalInterestForTheYear += interestAmountPerMonth;
    }

    return totalInterestForTheYear
  }

  resetForm() {
    this.emi = new EMI();
  }

  // download
  downloadResult() {

  }

  async shareResult() {
    await Share.share({
      text: `Monthly Payment: ₹${this.convertNumberToRupees(Number(this.emi.monthlyEMI))}\nTotal Interest: ₹${this.convertNumberToRupees(Number(this.emi.totalInterestForTheYear))}\nTotal Amount: ₹${this.convertNumberToRupees((this.emi.principle ? this.emi.principle : 0) + (this.emi.totalInterestForTheYear ? this.emi.totalInterestForTheYear : 0))}\nClosure Date: ${moment(this.emi.endDate, 'YYYY-MM-DD').format('DD-MM-YYYY')}`,
    });
  }

  convertNumberToRupees(numVal: number) {
    let numString = numVal.toString();
    let afterDecimalPointValues = '';
    let decimalSerparation = numString.split('.');
    let result = '';
    if (numString.includes('.')) {
      afterDecimalPointValues = '.' + decimalSerparation[1]
    }
    decimalSerparation[0].split('').reverse().forEach((res, i) => {
      if (i == 3 || (i > 3 && (i % 2 == 1))) {
        result += ','
      }
      result += res
    })
    return (result.split('').reverse().join('') + afterDecimalPointValues);
  }

}

export class EMI {
  principle: number | null = null;
  rateOfInterest: number | null = null;
  tenure: number | null = null;
  tenureType: string = 'Yearly';
  startDate: string = '';
  endDate: string = '';
  monthlyEMI: number | null = null;
  totalInterestForTheYear: number | null = null;
}
