import { Component, Input } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-content',
 
  templateUrl: './customer-content.component.html',
  styleUrl: './customer-content.component.scss'
})
export class CustomerContentComponent {
  @Input() contentContainerCSSClass: string = '';
  @Input() appContentContiner?: 'fixed' | 'fluid';
  @Input() appContentContainerClass: string = '';

  private unsubscribe: Subscription[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routingChanges();
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // DrawerComponent.hideAll();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
