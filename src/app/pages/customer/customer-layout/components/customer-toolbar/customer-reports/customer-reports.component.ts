import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-reports',

  templateUrl: './customer-reports.component.html',
  styleUrl: './customer-reports.component.scss'
})
export class CustomerReportsComponent implements OnInit{
  @Input() appPageTitleDisplay: boolean;

  constructor() {}

  ngOnInit(): void {}
}
