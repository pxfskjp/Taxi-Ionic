import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {TranslateService} from '@ngx-translate/core';
import {ConfigService} from '../providers/config-service/config-service';
import _ from "lodash";
import moment from "moment";
import {TabsPage} from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public translate: TranslateService,
    public configService: ConfigService,
    private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);

      configService.getAll().then(data => {

        if (_.isNull(data)) {
          data = {
            lang: 'bg'
          }

          configService.save(data);
        }

        translate.setDefaultLang(data.lang);
        translate.currentLang = data.lang;

        moment.locale(data.lang);
        moment.updateLocale(data.lang, {
          months: moment.months().map(_.capitalize)
        });

      });
    });
  }
}
