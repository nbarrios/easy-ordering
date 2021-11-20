import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, FirebaseUserData } from '../firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage implements OnInit {
  userData: FirebaseUserData;
  profileImage = null;

  constructor(
    public fireservice: FirebaseService,
    public firestore: AngularFirestore,
    public router: Router,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.userData = new FirebaseUserData();
    this.fireservice.getDetails().subscribe(val => {
      if (val !== undefined) {
        this.userData = val;
      }
    });
  }

  //Changes Profile Picture
  changePicture(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // read file as data url
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (ev) => {
        // called once readAsDataURL is completed
        this.profileImage = event.target.result;
      };
    }
  }

  // Deletes image and return to the default icon
  async delete() {
    // Ask for confirmation to delete
    const alert = (await this.alertCtrl
      .create({
        header: 'Delete Picture?',
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Yes',
            handler: () => {
              this.profileImage = null;
            }
          }
        ]
      }))
    .present();
  }

  //Updates Information
  updateInfo() {
    this.fireservice.saveDetails(this.userData).then(() => {
      console.log('Saved user details');
    });
  }

  changePassword() {
    alert('Working on it.');
  }

  logout() {
    this.fireservice.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
