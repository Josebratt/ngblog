import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
]


@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
