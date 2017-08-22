import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserItem } from "../../models/user-item/user-item.interface";
import { AngularFireAuth } from "angularfire2/auth";
import { ShoppingListPage } from '../shopping-list/shopping-list';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AngularFireAuth]
})
export class RegisterPage {

  user = {} as UserItem;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: UserItem) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      // console.log(result);
      if (result) {
        this.navCtrl.setRoot(ShoppingListPage);
      } 
    }
    catch (e) {
      console.error(e);
    }
  }
}