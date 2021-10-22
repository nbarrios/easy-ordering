import { Component, OnInit } from '@angular/core';
import { FirebaseService, FirebaseUserData } from '../firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public email: string;
  public password: string;
  public confirmPassword: string;

  constructor(
    public fireService: FirebaseService
  ) { }

  ngOnInit() {
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
         alert('Account Created!');
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      alert(err.message);
      console.log(err);
    });
  }
}
