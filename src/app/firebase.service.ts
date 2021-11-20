import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

export class FirebaseUserData {
  uid: string;
  email: string;

  name: string;
  gender: string;
  phone: string;
  profileImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private user: firebase.User = null;

  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {
    this.auth.user.subscribe(val => {
      console.log('Received user');
      this.user = val;
    });
  }

  getUserID() {
    if (this.user) {
      return this.user.uid;
    } else {
      return null;
    }
  }

  loginWithAccount(email: string, password: string) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then(credential => {
          this.user = credential.user;
          resolve(credential);
        }, err => {
          reject(err);
        });
    });
  }

  loginWithGoogle() {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(credential => {
          this.user = credential.user;
          resolve(credential);
        }, err => {
          reject(err);
        });
    });
  }

  loginWithFacebook() {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(credential => {
          this.user = credential.user;
          resolve(credential);
        }, err => {
          reject(err);
        });
    });
  }

  signup(email: string, password: string) {
    return new Promise<firebase.auth.UserCredential>((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
        .then(credential => {
          this.user = credential.user;
          resolve(credential);
        }, err => {
          reject(err);
        });
    });
  }

  saveDetails(data: FirebaseUserData) {
    //This doesn't work for nested objects. Do not nest user data fields.
    return this.firestore.collection<FirebaseUserData>('users').doc(this.user.uid).set(Object.assign({}, data));
  }

  getDetails() {
    return this.firestore.collection<FirebaseUserData>('users').doc(this.user.uid).valueChanges();
  }
}
