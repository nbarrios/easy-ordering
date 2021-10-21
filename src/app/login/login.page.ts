import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';

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
    this.fireService.loginWithAccount({email:this.email,password:this.password}).then(res=>{
      console.log(res);
      if(res.user.uid){
        this.fireService.getDetails({uid:res.user.uid}).subscribe(() => {
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
