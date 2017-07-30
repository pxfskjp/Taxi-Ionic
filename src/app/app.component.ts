import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {TranslateService} from '@ngx-translate/core';
import {ConfigService} from '../providers/config-service/config-service';
import {LanguagePage} from '../pages/language/language';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LanguagePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public translate: TranslateService,
    public configService: ConfigService,
    public screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
    });
  }
}
