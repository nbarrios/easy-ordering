import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

// To save / update data in the account settings page
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  public name: string;
  public gender: any;
  public phone: string;
  public email: string;

  constructor(
    public fireservice: FirebaseService,
    public router: Router
  ) {}

  updateInfo() {
    alert('Work in progress.');
  }

  logout() {
    this.fireservice.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
