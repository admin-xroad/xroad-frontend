import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-saas',
 
  templateUrl: './customer-saas.component.html',
  styleUrl: './customer-saas.component.scss'
})
export class CustomerSaasComponent implements OnInit {
  @Input() appPageTitleDisplay: boolean;

  constructor() {}

  ngOnInit(): void {}
}
