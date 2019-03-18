import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserorgComponent } from './adduserorg.component';

describe('AdduserorgComponent', () => {
  let component: AdduserorgComponent;
  let fixture: ComponentFixture<AdduserorgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserorgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
