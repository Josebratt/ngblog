import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat';
import { Observable, of } from 'rxjs';
import {switchMap} from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      // Get the auth state, then fetch the Firestore user document or return null
      this.user = this.afAuth.authState.pipe(
        switchMap((user) => {
          if(user){
            this.router.navigate(['/dashboard']);
            // If the user is logged in, return the user details.
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // If the user is NOT logged in, return null.
            return of(null)
          }
        })
      )
    }

  async login() {
    // Store the return URL in localstorage, to be used once the user logs in successfully
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || this.router.url;
    localStorage.setItem("returnUrl", returnUrl);
    
    const credential = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.updateUserData(credential.user);

    try {
      
    } catch (error) {
      console.log(error);
      
    }
  }

  async logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }

  // Save the user data to firestore on login
  private updateUserData(user: firebase.User | null) {
    const userRef = this.afs.doc(`users/${user!.uid}`);
    const data = {
      name: user!.displayName,
      email: user!.email,
      photoURL: user!.photoURL,
    };
    return userRef.set(data, { merge: true });
  }

  
}
