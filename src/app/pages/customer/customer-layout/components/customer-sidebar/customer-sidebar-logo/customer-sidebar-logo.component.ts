import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/_metronic/layout';
import { LayoutType } from 'src/app/_metronic/layout/core/configs/config';

@Component({
  selector: 'app-customer-sidebar-logo',
  templateUrl: './customer-sidebar-logo.component.html',
  styleUrl: './customer-sidebar-logo.component.scss'
})
export class CustomerSidebarLogoComponent {
  private unsubscribe: Subscription[] = [];
  @Input() toggleButtonClass: string = '';
  @Input() toggleEnabled: boolean;
  @Input() toggleType: string = '';
  @Input() toggleState: string = '';
  currentLayoutType: LayoutType | null;

  toggleAttr: string;

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.toggleAttr = `app-sidebar-${this.toggleType}`;
    const layoutSubscr = this.layout.currentLayoutTypeSubject
      .asObservable()
      .subscribe((layout) => {
        this.currentLayoutType = layout;
      });
    this.unsubscribe.push(layoutSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
