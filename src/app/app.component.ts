import { Component,OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {authConfig} from './auth.config';

@Component({
  selector: 'Apollo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private oauthService: OAuthService) {
    this.configureWithNewConfigApi();
    }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
    private configureWithNewConfigApi() { 
   
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    } 
   
}
