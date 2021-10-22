import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService, FirebaseUserData } from '../firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email: string;
  public password: string;

  constructor(
    public router: Router,
    public fireService: FirebaseService
  ) { }

  ngOnInit() {
  }


  login(){
    const userData = new FirebaseUserData(this.email, this.password);
    this.fireService.loginWithAccount(userData).then(res=>{
      console.log(res);
      if(res.user.uid){
        userData.uid = res.user.uid;
        this.fireService.getDetails(userData).subscribe(() => {
          console.log(res);
          alert('Welcome ');
        },err=>{
          console.log(err);
        });
      }
    },err=>{
      alert(err.message);
      console.log(err);
    });
  }

  signup(){
    this.router.navigateByUrl('signup');
  }
}
