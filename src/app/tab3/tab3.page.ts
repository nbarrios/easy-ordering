import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public fireservice: FirebaseService,
    public router: Router
  ) {}

  logout() {
    this.fireservice.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
