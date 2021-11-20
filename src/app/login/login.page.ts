import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService, FirebaseUserData } from '../firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { confirmPasswordReset, getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  public email: string;
  public password: string;
  public confirmPassword: string;
  userAuth = 'login';
  userData: FirebaseUserData;

  constructor(
    public router: Router,
    public fireService: FirebaseService,
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {
    console.log('Init');
  }

  login(){
    const userData = new FirebaseUserData();
    this.fireService.loginWithAccount(this.email, this.password).then(res=>{
      console.log(res);
      if(res.user.uid){
        userData.uid = res.user.uid;
        this.fireService.getDetails().subscribe(() => {
          console.log(res);
          this.router.navigateByUrl('/');
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      const errCode = err.code;
      const errMessage = err.message;
      if(errCode === 'auth/wrong-password') {
        alert('Invalid password');
      }
      else if (errCode === 'auth/invalid-email') {
        alert('Invalid email.');
      }
      else if (errCode === 'auth/user-not-found') {
        alert('Account is not found.');
      }
      else if (errCode === 'auth/user-disabled') {
        alert('Account is disabled or does not exist');
      }
      else {
        alert(errMessage);
      }
    });
  }

  signup() {
    //Check that password fields match
    if (this.password !== this.confirmPassword) {
      alert('Please confirm that the passwords match');
      return;
    }

    const userData = new FirebaseUserData();
    this.fireService.signup(this.email, this.password)
    .then(res=>{
      if(res.user.uid){
        userData.uid = res.user.uid;
        this.fireService.saveDetails(userData).then(() => {
          console.log('Account created: ' + res.user.uid);
          alert('Account successfully created.');
          this.router.navigateByUrl('/');
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      const errCode = err.code;
      const errMessage = err.message;
      if(errCode === 'auth/email-already-in-use') {
        alert('Email is already in use by another account.');
      }
      else if (errCode === 'auth/invalid-email') {
        alert('Invalid email.');
      }
      else if (errCode === 'auth/operation-not-allowed') {
        alert('Email and password accounts are not enabled.');
      }
      else if (errCode === 'auth/weak-password') {
        alert('Password is weak. Please retry.');
      }
      else {
        alert(errMessage);
      }
    });
  }

  loginWithGoogle() {
    //Need to use signInWithPopup to be directed into the app correctly
    this.fireService.loginWithGoogle()
      .then(res => {
        if (res.user) {
          if(res.user.uid){
            const userData = new FirebaseUserData();
            userData.uid = res.user.uid;
            this.fireService.getDetails().subscribe(() => {
              console.log(res);
              this.router.navigateByUrl('/');
            },err=>{
              console.log(err);
            });
          }
        }
      }, err => {
        console.log(err);
        const errCode = err.code;
        const errMessage = err.message;
        if(errCode === 'auth/account-exists-with-different-credential') {
          alert('Account exists with this email.');
        }
        else if (errCode === 'auth/auth-domain-config-required') {
          alert('Domain error.');
        }
        else if (errCode === 'auth/cancelled-popup-request') {
          alert('Only one popup at a time.');
        }
        else if (errCode === 'auth/operation-not-allowed') {
          alert('Email and password accounts are not enabled.');
        }
        else if (errCode === 'auth/operation-not-supported-in-this-environment') {
          alert('Application is not supported in this environment.');
        }
        else if (errCode === 'auth/popup-blocked') {
          alert('Popup is blocked by the browser. Please try again.');
        }
        else if (errCode === 'auth/popup-closed-by-user') {
          alert('Popup is closed without signing in.');
        }
        else if (errCode === 'auth/unauthorized-domain') {
          alert('Unauthorized domain.');
        }
        else {
          alert(errMessage);
        }
      });
  }

  loginWithFacebook() {
    this.fireService.loginWithFacebook()
      .then(res => {
        if (res.user) {
          if(res.user.uid){
            const userData = new FirebaseUserData();
            userData.uid = res.user.uid;
            this.fireService.getDetails().subscribe(() => {
              console.log(res);
              this.router.navigateByUrl('/');
            },err=>{
              console.log(err);
            });
          }
        }
      }, err => {
        console.log(err);
        const errCode = err.code;
        const errMessage = err.message;
        if(errCode === 'auth/account-exists-with-different-credential') {
          alert('Account exists with this email.');
        }
        else if (errCode === 'auth/auth-domain-config-required') {
          alert('Domain error.');
        }
        else if (errCode === 'auth/cancelled-popup-request') {
          alert('Only one popup at a time.');
        }
        else if (errCode === 'auth/operation-not-allowed') {
          alert('Email and password accounts are not enabled.');
        }
        else if (errCode === 'auth/operation-not-supported-in-this-environment') {
          alert('Application is not supported in this environment.');
        }
        else if (errCode === 'auth/popup-blocked') {
          alert('Popup is blocked by the browser. Please try again.');
        }
        else if (errCode === 'auth/popup-closed-by-user') {
          alert('Popup is closed without signing in.');
        }
        else if (errCode === 'auth/unauthorized-domain') {
          alert('Unauthorized domain.');
        }
        else {
          alert(errMessage);
        }
      });
  }

  forgotPassword() {
    alert('Working on it.');

    // Direct to Forgot Password page
    this.router.navigateByUrl('/forgot-password');
  }
}