import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAdoZlNfhx7RSboOvhrTdb9LdghYhwL0Zo',
  authDomain: 'easy-order-4ba7a.firebaseapp.com',
  projectId: 'easy-order-4ba7a',
  storageBucket: 'easy-order-4ba7a.appspot.com',
  messagingSenderId: '621725360024',
  appId: '1:621725360024:web:c308568899d60df0cad5ed',
  measurementId: 'G-WGKR004L8J'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
