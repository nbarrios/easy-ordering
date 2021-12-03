import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, FirebaseUserData } from '../firebase.service';
import { AlertController } from '@ionic/angular';
import { confirmPasswordReset, getAuth, sendPasswordResetEmail } from 'firebase/auth';

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

  //NOT working~!!! WHY??
  //Changes Profile Picture
  changePicture(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // read file as data url
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (ev) => {
        this.profileImage = reader.result;
      };

      // Updates picture to Firebase
      this.updateInfo();
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
      console.log('Saved user details.');
      alert('Account information successfully updated.');
    });
  }

  changePassword() {
    const auth = getAuth();
    // Send passwork reset link to email
    this.fireservice.auth.sendPasswordResetEmail(this.userData.email)
    .then(() => {
      // Password reset email sent!
      console.log('Email to reset was sent.');
      alert('Password reset link has been sent to your email.');
    },err=>{
      const errCode = err.code;
      const errMessage = err.message;
      if(errCode === 'auth/missing-email') {
        alert('Email is missing.');
      }
      else if (errCode === 'auth/invalid-email') {
        alert('Invalid email.');
      }
      else if (errCode === 'auth/missing-continue-uri') {
        alert('Missing continue URL.');
      }
      else if (errCode === 'auth/unauthorized-continue-uri') {
        alert('Unauthorized continue URL.');
      }
      else if (errCode === 'auth/user-not-found') {
        alert('Account is not found.');
      }
      else {
        alert(errMessage);
      }
    });
  }

  logout() {
    this.fireservice.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
