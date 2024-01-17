import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-customer-footer',
 
  templateUrl: './customer-footer.component.html',
  styleUrl: './customer-footer.component.scss'
})
export class CustomerFooterComponent {
  @Input() appFooterContainerCSSClass: string = '';

  currentDateStr: string = new Date().getFullYear().toString();
  constructor() {}
}
