import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface'

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private ActionSheetCtrl: ActionSheetController
  ) {
    // Point shoppingListRef$ at firebase -> 'shopping-list' node.
    // That means not only can we push things from this reference to the 
    // database, but ALSO we have accessto everything inside of that node.
    this.shoppingListRef$ = this.database.list('shopping-list');

    // Show all the shopping-list on the console
    //this.shoppingListRef$.subscribe(x => console.log(x));
  }

  /*
      Display an ActionSheet that gives the user the following options:  
      1. Edit the ShoppingItem
      1. Delete the ShoppingItem
      3. Cancel selection
    */
  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.ActionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [{
        text: 'Edit',
        handler: () => {
          // Send the user to the EditShoppingItemPage and pass the key as a parameter.
          this.navCtrl.push(EditShoppingItemPage,
            { shoppingItemId: shoppingItem.$key });

        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        handler: () => {
          // Deletes the current shoppingItem, passed in via the parameter
          this.shoppingListRef$.remove(shoppingItem.$key);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log("The user has selected the cancel button");
        }
      }]
    }).present();
  }

  navigateToAddShoppingPage() {
    // Navigates the user to the AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }

}
