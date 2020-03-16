import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.css']
})
export class InstallmentComponent implements OnInit {

  public pieChartLabels = ['Principal Amount', 'Total Interest Payable'];
  public pieChartData = [] ;
  public pieChartType = 'pie';

  constructor() {
    this.yearToggle = true;
  }

  pemi = {
    value: '25'
  };
  remi = {
    value: '9'
  };
  temi = {
    value: '20'
  };
  memi = {
    value: '240'
  };

  query = {
    amount: '',
    interest: '',
    tenureYr: '',
    tenureMo: ''
  };

  result = {
    emi: '',
    interest: '',
    total: ''
  };
  yearToggle: boolean;
  poptions: Options = {
    floor: 1,
    ceil: 200,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>L</b>';
        case LabelType.High:
          return value + '<b>L</b>';
        default:
          return value + '<b>L</b>';
      }
    }
  };
  roptions: Options = {
    floor: 5,
    ceil: 20,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>%</b>';
        case LabelType.High:
          return value + '<b>%</b>';
        default:
          return value + '<b>%</b>';
      }
    }
  };
  toptions: Options = {
    floor: 1,
    ceil: 30,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>Y</b>';
        case LabelType.High:
          return value + '<b>Y</b>';
        default:
          return value + '<b>Y</b>';
      }
    }
  };
  moptions: Options = {
    floor: 1,
    ceil: 360,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '<b>M</b>';
        case LabelType.High:
          return value + '<b>M</b>';
        default:
          return value + '<b>M</b>';
      }
    }
  };

   ngOnInit() {
    this.update();
  }

  tbupdate(id: number) {
    if (id === 0) {
      this.pemi.value = (Number(this.query.amount) / 100000).toString();
    } else if (id === 1) {
      this.remi.value = this.query.interest;
    } else if (id === 2) {
      this.temi.value = this.query.tenureYr;
    } else if (id === 3) {
      this.memi.value = this.query.tenureMo;
    }
    this.update();
  }

  update() {

    const loanAmount = Number(this.pemi.value) * 100000;
    const numberOfMonths = (this.yearToggle) ? (Number(this.temi.value) * 12) : Number(this.memi.value);
    const rateOfInterest = Number(this.remi.value);
    const monthlyInterestRatio = (rateOfInterest / 100) / 12;

    this.query.amount = loanAmount.toString();
    this.query.interest = rateOfInterest.toString();
    if (this.yearToggle) {
      this.query.tenureYr = this.temi.value.toString();
    } else {
      this.query.tenureMo = this.memi.value.toString();
    }
    const top = Math.pow((1 + monthlyInterestRatio), numberOfMonths);
    const bottom = top - 1;
    const sp = top / bottom;
    const emi = ((loanAmount * monthlyInterestRatio) * sp);
    const full = numberOfMonths * emi;
    const interest = full - loanAmount;

    this.result.emi = emi.toFixed(0).toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.result.total = full.toFixed(0).toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.result.interest = interest.toFixed(0).toString().replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    this.pieChartData = [loanAmount, interest.toFixed(0)];
    }
}
