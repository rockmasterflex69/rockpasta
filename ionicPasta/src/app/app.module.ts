import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {Home} from '../pages/Home/Home';
import {GamingPage} from '../pages/gaming/gaming';
import {Page2} from '../pages/page2/page2';
import {BasicModal} from '../components/basic-modal';


@NgModule({
  declarations: [
    MyApp,
    Home,
    GamingPage,
    Page2,
    BasicModal
  ],
  imports: [
    IonicModule.forRoot(MyApp, {mode: 'md'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    GamingPage,
    Page2,
    BasicModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
}
