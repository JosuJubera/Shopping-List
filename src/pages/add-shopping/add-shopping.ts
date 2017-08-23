import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // Creating a new Object
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    public authData: AuthProvider
  ) {

    // Get current user Id
    var currentUserId = this.authData.afAuth.auth.currentUser.uid;
    this.shoppingItemRef$ = this.database.list(`${currentUserId}/shopping-list`);
  }

  addShoppingItem(shoppingItem: ShoppingItem) {

    // Creates a new Object and converts itemNumber to a number. 
    // Push this to our Firebase database under the 'shopping-list' node.
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    })

    // Reset our ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    // Navigate the user back to the ShoppingListPage
    this.navCtrl.pop();
  }

}
