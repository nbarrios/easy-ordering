import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, FirebaseUserData } from '../firebase.service';
import { confirmPasswordReset, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  userData: FirebaseUserData;
  email: string;

  constructor(
    public fireservice: FirebaseService,
    public firestore: AngularFirestore,
    public router: Router,
    public toastController: ToastController
  ) {}

  ngOnInit() {
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

  resetPassword() {
    const auth = getAuth();
    
    // Send passwork reset link to email
    this.fireservice.auth.sendPasswordResetEmail(this.email)
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
}
