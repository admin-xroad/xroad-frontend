import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-sidebar-footer',

  templateUrl: './customer-sidebar-footer.component.html',
  styleUrl: './customer-sidebar-footer.component.scss'
})
export class CustomerSidebarFooterComponent implements OnInit {
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;
  constructor() {}

  ngOnInit(): void {}

}
