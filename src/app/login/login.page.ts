import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseService, FirebaseUserData } from '../firebase.service';
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

  constructor(
    public router: Router,
    public fireService: FirebaseService,
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {
    console.log('Init');
  }

  login(){
    const userData = new FirebaseUserData(this.email, this.password);
    this.fireService.loginWithAccount(userData).then(res=>{
      console.log(res);
      if(res.user.uid){
        userData.uid = res.user.uid;
        this.fireService.getDetails(userData).subscribe(() => {
          console.log(res);
          this.router.navigateByUrl('/');
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      alert(err.message);
      console.log(err);
    });
  }

  signup() {
    //Check that password fields match
    if (this.password !== this.confirmPassword) {
      alert('Please confirm that the passwords match');
      return;
    }

    const userData = new FirebaseUserData(this.email, this.password);
    this.fireService.signup(userData)
    .then(res=>{
      if(res.user.uid){
        userData.uid = res.user.uid;
        this.fireService.saveDetails(userData).then(() => {
          console.log('Account created: ' + res.user.uid);
          this.router.navigateByUrl('/');
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      alert(err.message);
      console.log(err);
    });
  }

  loginWithGoogle() {
    //Need to use signInWithPopup to be directed into the app correctly
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        if (res.user) {
          if(res.user.uid){
            const userData = new FirebaseUserData(res.user.email);
            userData.uid = res.user.uid;
            this.fireService.getDetails(userData).subscribe(() => {
              console.log(res);
              this.router.navigateByUrl('/');
            },err=>{
              console.log(err);
            });
          }
        }
      }, err => {
        console.log(err);
      });
  }

  loginWithFacebook() {
    alert('Testing Facebook Button');
    // Does NOT work yet
    //this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
}
