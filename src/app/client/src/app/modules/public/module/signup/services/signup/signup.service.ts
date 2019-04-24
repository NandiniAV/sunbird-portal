import { Injectable } from '@angular/core';
import { LearnerService } from '@sunbird/core';
import { ConfigService } from '@sunbird/shared';
import * as  _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private learnerService: LearnerService, public configService: ConfigService) { }

  generateOTP(data) {
    const options = {
      url: this.configService.urlConFig.URLS.OTP.GENERATE,
      data: data
    };
    return this.learnerService.post(options);
  }

  verifyOTP(data) {
    const options = {
      url: this.configService.urlConFig.URLS.OTP.VERIFY,
      data: data
    };
    return this.learnerService.post(options);
  }

  getUserByKey(data) {
    const options = {
      url: this.configService.urlConFig.URLS.USER.GET_USER_BY_KEY + '/' + data,
    };
    return this.learnerService.get(options);
  }

  createUser(data) {
    const options = {
      url: this.configService.urlConFig.URLS.USER.CREATE_V2,
      data: data
    };
    return this.learnerService.post(options);
  }

  /**
   * This method invokes learner service to add new user
   */
  signup(req) {
    const data = this.formatRequest(req);
    const options = {
      url: this.configService.urlConFig.URLS.USER.SIGNUP,
      data: data
    };
    return this.learnerService.post(options);
  }

  /**
   * This method is used to format the request
   */
  private formatRequest(request) {
    if (_.get(request, 'phone')) {
      request.phoneVerified = true;
    }
    return {
      params: {},
      request: request
    };
  }
}
