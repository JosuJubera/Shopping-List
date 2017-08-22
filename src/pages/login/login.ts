import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserItem } from "../../models/user-item/user-item.interface";
import { AngularFireAuth } from 'angularfire2/auth';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as UserItem;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }
 
  async login(user: UserItem) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.setRoot(ShoppingListPage);
      }  
    }
    catch (e) {
      console.error(e);
    }
  }
 
  register() {
    this.navCtrl.push(RegisterPage);
  }
}