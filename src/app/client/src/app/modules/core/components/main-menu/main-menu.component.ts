import { ConfigService, ResourceService, IUserData, IUserProfile, ServerResponse } from '@sunbird/shared';
import { Component, OnInit } from '@angular/core';
import { UserService, PermissionService, TenantService} from '../../services';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { IInteractEventObject, IInteractEventEdata } from '@sunbird/telemetry';
import { CacheService } from 'ng2-cache-service';
import { first, filter, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AnnouncementService } from '../../services/announcement/announcement.service';
import * as _ from 'lodash';
declare var jQuery: any;

/**
 * Main menu component
 */
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  /**
   * Workspace access roles
   */
  workSpaceRole: Array<string>;
  /**
   * reference of resourceService service.
   */
  public resourceService: ResourceService;
  /**
   * reference of UserService service.
   */
  public userService: UserService;
  /**
   * reference of permissionService service.
   */
  public permissionService: PermissionService;
  /**
   * reference of config service.
   */
  public config: ConfigService;
    /**
   * user profile details.
   */
  userProfile: IUserProfile;
  /**
   * reference of Router.
   */
  private router: Router;
  homeMenuIntractEdata: IInteractEventEdata;
  learnMenuIntractEdata: IInteractEventEdata;
  libraryMenuIntractEdata: IInteractEventEdata;
  workspaceMenuIntractEdata: IInteractEventEdata;
  helpMenuIntractEdata: IInteractEventEdata;
  exploreRoutingUrl: string;
  showExploreHeader = false;
  helpLinkVisibility: string;
  signInIntractEdata: IInteractEventEdata;
  confluenceIssueUrl: string;
  confluenceDiscussUrl: string;
  /**
   * reference of tenant service.
   */
  public tenantService: TenantService;
  /**
   * To make inbox API calls
   */
  private announcementService: AnnouncementService;
  notificationSubscription: Subscription;
  notificationCount: any;
  inboxData: any;
  /*
  * constructor
  */
  constructor(resourceService: ResourceService, userService: UserService, router: Router,
     permissionService: PermissionService, config: ConfigService, private cacheService: CacheService, tenantService: TenantService,
     announcementService: AnnouncementService) {
    this.resourceService = resourceService;
    this.userService = userService;
    this.permissionService = permissionService;
    this.router = router;
    this.config = config;
    this.announcementService = announcementService;
    this.tenantService = tenantService;
    this.workSpaceRole = this.config.rolesConfig.headerDropdownRoles.workSpaceRole;
    this.confluenceIssueUrl = (<HTMLInputElement>document.getElementById('issueForwateUrl')).value;
    this.confluenceDiscussUrl = (<HTMLInputElement>document.getElementById('discussForwaterUrl')).value;
    this.router.events.subscribe((val) => {
      // to get announcement count
      if (val instanceof NavigationEnd && val.url.indexOf('announcement') === -1) {
        if (this.userService.loggedIn) {
          const option = {
            pageNumber: 1,
            limit: 1000
          };
          this.announcementService.getInboxData(option).pipe(
            switchMap(() => this.announcementService.getInboxData(option))
          ).subscribe(
            (apiResponse: ServerResponse) => {
              this.inboxData = this.inboxData = apiResponse.result && apiResponse.result.announcements &&
              apiResponse.result.announcements.filter(data => data.received === false) || [];
              const currentVal = parseInt(localStorage.getItem(this.userService.userid) || '0', 0);
              this.notificationCount = this.inboxData.length + currentVal;
            }
          );
        }
      }
    });
  }

  ngOnInit() {
    try {
      this.helpLinkVisibility = (<HTMLInputElement>document.getElementById('helpLinkVisibility')).value;
    } catch (error) {
      this.helpLinkVisibility = 'false';
    }
    this.setInteractData();
    this.getUrl();
    this.workSpaceRole = this.config.rolesConfig.headerDropdownRoles.workSpaceRole;
    this.userService.userData$.pipe(first()).subscribe(
      (user: IUserData) => {
        if (user && !user.err) {
          this.userProfile = user.userProfile;
        }
      });
  }
  setInteractData() {
    this.homeMenuIntractEdata = {
      id: 'home-tab',
      type: 'click',
      pageid: 'home'
    };
    this.libraryMenuIntractEdata = {
      id: 'library-tab',
      type: 'click',
      pageid: 'library'
    };
    this.learnMenuIntractEdata = {
      id: 'learn-tab',
      type: 'click',
      pageid: 'learn'
    };
    this.workspaceMenuIntractEdata = {
      id: 'workspace-menu-button',
      type: 'click',
      pageid: 'workspace'
    };
    this.helpMenuIntractEdata = {
      id: 'help-menu-tab',
      type: 'click',
      pageid: 'help'
    };
    this.signInIntractEdata = {
      id: ' signin-tab',
      type: 'click',
    };
  }

  getLogoutInteractEdata() {
    return {
      id: 'logout',
      type: 'click',
      pageid: this.router.url.split('/')[1]
    };
  }

  logout() {
    window.location.replace('/logoff');
    this.cacheService.removeAll();
  }

  showSideBar() {
    jQuery('.ui.sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
  }

  getUrl() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((urlAfterRedirects: NavigationEnd) => {
      if (_.includes(urlAfterRedirects.url, '/explore')) {
        this.showExploreHeader = true;
        const url  = urlAfterRedirects.url.split('?')[0].split('/');
        if (url.indexOf('explore') === 2) {
          this.exploreRoutingUrl = url[1] + '/' + url[2];
        } else {
          this.exploreRoutingUrl = url[1];
        }
      } else if (_.includes(urlAfterRedirects.url, '/explore-course')) {
        this.showExploreHeader = true;
        const url  = urlAfterRedirects.url.split('?')[0].split('/');
        if (url.indexOf('explore-course') === 2) {
          this.exploreRoutingUrl = url[1] + '/' + url[2];
        } else {
          this.exploreRoutingUrl = url[1];
        }
      } else {
        this.showExploreHeader = false;
      }
      this.signInIntractEdata['pageid'] = this.exploreRoutingUrl;
    });
  }

  navigateToWorkspace() {
    const authroles = this.permissionService.getWorkspaceAuthRoles();
    if (authroles) {
      return authroles.url;
    }
  }

  navigateToAnnoucements() {
    this.notificationCount = 0;
    localStorage.setItem(this.userService.userid, this.notificationCount);
    this.router.navigate(['../announcement/inbox/1']);
  }
}
