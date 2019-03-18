import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from '@sunbird/shared';

@Component({
  selector: 'app-adduserorg',
  templateUrl: './adduserorg.component.html',
  styleUrls: ['./adduserorg.component.scss']
})
export class AdduserorgComponent implements OnInit {

  constructor(public resourceService: ResourceService) {
    this.resourceService = resourceService;
  }

  ngOnInit() {
  }

}
