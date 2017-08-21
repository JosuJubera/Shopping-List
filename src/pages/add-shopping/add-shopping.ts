import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // Creating a new Object
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');
  }

  addShoppingItem(shoppingItem: ShoppingItem) {
    // // Log the results
    // console.log(shoppingItem);

    // Creates a new Object and converts itemNumber to a number. Push this to our Firebase database under the 
    // 'shopping-list' node.
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
