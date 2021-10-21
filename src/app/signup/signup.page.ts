import { Component, OnInit } from '@angular/core';
import { FireserviceService } from '../fireservice.service';

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
    public fireService: FireserviceService
  ) { }

  ngOnInit() {
  }

  signup() {
    //Check that password fields match
    if (this.password !== this.confirmPassword) {
      alert('Please confirm that the passwords match');
      return;
    }

    this.fireService.signup({email: this.email, password: this.password})
    .then(res=>{
      if(res.user.uid){
        const data = {
          email:this.email,
          password:this.password,
          uid:res.user.uid
        };
        this.fireService.saveDetails(data).then(res=>{
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
