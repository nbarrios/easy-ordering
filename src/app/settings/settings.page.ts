import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from '../firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {
  name: string;
  gender: any;
  phone: string;
  email: string;
  profileImage = null;
  owner: string;

  constructor(
    public fireservice: FirebaseService,
    public firestore: AngularFirestore,
    public router: Router,
    public alertCtrl: AlertController
  ) {}

  //Changes Profile Picture
  changePicture(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      // read file as data url
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => { 
        // called once readAsDataURL is completed
        this.profileImage = event.target.result;
      }
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
    alert('Work in progress.');
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