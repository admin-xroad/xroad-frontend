import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PageInfoService, PageLink } from 'src/app/_metronic/layout';

@Component({
  selector: 'app-customer-page-title',
  
  templateUrl: './customer-page-title.component.html',
  styleUrl: './customer-page-title.component.scss'
})
export class CustomerPageTitleComponent {
  private unsubscribe: Subscription[] = [];

  @Input() appPageTitleDirection: string = '';
  @Input() appPageTitleBreadcrumb: boolean;
  @Input() appPageTitleDescription: boolean;

  title$: Observable<string>;
  description$: Observable<string>;
  bc$: Observable<Array<PageLink>>;

  constructor(private pageInfo: PageInfoService) {}

  ngOnInit(): void {
    this.title$ = this.pageInfo.title.asObservable();
    this.description$ = this.pageInfo.description.asObservable();
    this.bc$ = this.pageInfo.breadcrumbs.asObservable();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
