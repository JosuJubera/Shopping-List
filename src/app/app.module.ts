import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthProvider } from '../providers/auth/auth';
import { MyApp } from './app.component';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { AddShoppingPage } from '../pages/add-shopping/add-shopping';
import { EditShoppingItemPage } from '../pages/edit-shopping-item/edit-shopping-item';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { RegisterPage } from '../pages/register/register';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    EditShoppingItemPage,
    RegisterPage,
    LoginPage,
    ResetPasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    // Initialize AngularFire with credentials from the dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    // Import the AngularFireDatabaseModule to use database interactions
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    EditShoppingItemPage,
    RegisterPage,
    LoginPage,
    ResetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
