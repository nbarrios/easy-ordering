import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, FirebaseUserData } from '../firebase.service';
import { AlertController, ToastController } from '@ionic/angular';
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
    public alertCtrl: AlertController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.userData = new FirebaseUserData();
    this.fireservice.getDetails().subscribe(val => {
      if (val !== undefined) {
        this.userData = val;
      }
    });
  }

  displayToast(msg: string) {
      const toast = this.toastController.create({
        message: msg,
        duration: 3000,
        position: 'middle'
      }).then(val => {
        val.present();
      });
  }

  //Changes Profile Picture
  changePicture(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      // read file as data url
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (ev) => {
        this.userData.profileImage = reader.result.toString();
        // Updates picture to Firebase
        this.updateInfo();
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
              this.userData.profileImage = null;
              this.updateInfo();
            }
          }
        ]
      }))
    .present();
  }

  //Updates Information
  updateInfo() {
    this.fireservice.saveDetails(this.userData).then(() => {
      this.displayToast('Account information successfully updated.');
    });
  }

  changePassword() {
    const auth = getAuth();
    // Send passwork reset link to email
    this.fireservice.auth.sendPasswordResetEmail(this.userData.email)
    .then(() => {
      // Password reset email sent!
      this.displayToast('Password reset link has been sent to your email.');
    },err=>{
      const errCode = err.code;
      const errMessage = err.message;
      if(errCode === 'auth/missing-email') {
        this.displayToast('Email is missing.');
      }
      else if (errCode === 'auth/invalid-email') {
        this.displayToast('Invalid email.');
      }
      else if (errCode === 'auth/missing-continue-uri') {
        this.displayToast('Missing continue URL.');
      }
      else if (errCode === 'auth/unauthorized-continue-uri') {
        this.displayToast('Unauthorized continue URL.');
      }
      else if (errCode === 'auth/user-not-found') {
        this.displayToast('Account is not found.');
      }
      else {
        this.displayToast(errMessage);
      }
    });
  }

  logout() {
    this.fireservice.auth.signOut().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
