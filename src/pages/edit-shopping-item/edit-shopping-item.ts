import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    public authData: AuthProvider) {

    // Capture the shoppingItemId as a NavParameter
    const shoppingItemId = this.navParams.get('shoppingItemId');
    
    // Get current user Id
    var currentUserId = this.authData.afAuth.auth.currentUser.uid;

    // Set the scope of our Firebase Object equal to our selected item
    this.shoppingItemRef$ = this.database.object(`${currentUserId}/shopping-list/${shoppingItemId}`);

    // Subscribe to the Object and assign the result to this.shoppingItem
    this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(
      shoppingItem => this.shoppingItem = shoppingItem);
  }

  editShoppingItem(shoppingItem) {
    // Update our Firebase node with the new item data
    this.shoppingItemRef$.update(shoppingItem);

    // Navigate the user back to the ShoppingListPage
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // Unsubscribe from the Observable when leaving the page
    this.shoppingItemSubscription.unsubscribe();
  }
}
