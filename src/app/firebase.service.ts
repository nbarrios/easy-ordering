import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export class FirebaseUserData {
  uid: string;
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    this.uid = '';
  }
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) {}

  loginWithAccount(data: FirebaseUserData) {
    return this.auth.signInWithEmailAndPassword(data.email, data.password);
  }

  signup(data: FirebaseUserData) {
    return this.auth.createUserWithEmailAndPassword(data.email, data.password);
  }

  saveDetails(data: FirebaseUserData) {
    //Unpack FirebaseUserData into plain object
    return this.firestore.collection('users').doc(data.uid).set({
      uid: data.uid,
      email: data.email,
      password: data.password
    });
  }

  getDetails(data: FirebaseUserData) {
    return this.firestore.collection('users').doc(data.uid).valueChanges();
  }
}
