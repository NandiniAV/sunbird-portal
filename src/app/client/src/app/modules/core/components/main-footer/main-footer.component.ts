import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '@sunbird/shared';
@Component({
  selector: 'app-footer',
  templateUrl: './main-footer.component.html'
})
export class MainFooterComponent implements OnInit {
  /**
   * reference of resourceService service.
   */
  public resourceService: ResourceService;
   /**
   * reference of Router.
   */
  private router: Router;
  /*
  Date to show copyright year
  */
  date = new Date();
  /*
  Hide or show footer
  */
  showFooter = true;

  constructor(resourceService: ResourceService, router: Router) {
    this.resourceService = resourceService;
    this.router = router;
  }

  ngOnInit() {
  }

}
