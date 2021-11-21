import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService, FirebaseUserData } from '../firebase.service';
import { confirmPasswordReset, getAuth, sendPasswordResetEmail } from "firebase/auth";

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
    public router: Router
  ) {}

  ngOnInit() {
  }

  resetPassword() {
    const auth = getAuth();
    
    // Send passwork reset link to email
    this.fireservice.auth.sendPasswordResetEmail(this.email)
    .then(() => {
      // Password reset email sent!
      console.log('Email to reset was sent.')
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
}
