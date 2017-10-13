import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

import { DataService } from './data.service';

declare var Auth0Lock: any;

@Injectable()
export class Auth0Service {

  lock = new Auth0Lock('uUgZOgGmcBw6yDXCOL1yssPlxHuTFoy6', 'redvirus.auth0.com', {
    scope: 'openid profile',
    languageDictionary: {
      title: 'Login to Food Bucket'
    },
    theme: {
      logo: '../../favicon.ico'
    }
  });

  constructor(private router: Router, private data: DataService) {
    this.lock.on('authenticated', authResult => {
      localStorage.setItem('idToken', authResult.idToken);
      // console.log(authResult);
      console.log(this.data.getUser());
    });
  }

  login() {
    this.lock.show();
    this.router.navigate(['/dashboard']);
  }
  isAuthenticated(): boolean {
    return tokenNotExpired('idToken');
  }
  logout() {
    localStorage.removeItem('idToken');
  }
}
