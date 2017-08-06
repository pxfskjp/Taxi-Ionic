import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {SettingsPage} from '../pages/settings/settings';
import {SearchPage} from '../pages/search/search';
import {ResultsPage} from '../pages/results/results';
import {DetailsPage} from '../pages/details/details';
import {LanguagePage} from '../pages/language/language';
import {AreaPage} from '../pages/area/area';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {ConfigService} from '../providers/config-service/config-service';
import {IonicStorageModule} from '@ionic/storage';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpModule, Http, JsonpModule} from '@angular/http';
import {AppVersion} from '@ionic-native/app-version';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { MomentModule } from 'angular2-moment';
import { TaxiService } from '../providers/taxi-service/taxi-service';
import { ApiConfig } from '../providers/api-config/api-config';
import { FormatPlatePipe } from '../pipes/format-plate/format-plate';
import { TranslatedAreaPipe } from '../pipes/translated-area/translated-area';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    SearchPage,
    ResultsPage,
    DetailsPage,
    LanguagePage,
    AreaPage,
    TabsPage,
    FormatPlatePipe,
    TranslatedAreaPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    JsonpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    SearchPage,
    ResultsPage,
    TabsPage,
    DetailsPage,
    LanguagePage,
    AreaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigService,
    AppVersion,
    ScreenOrientation,
    TaxiService,
    ApiConfig
  ]
})
export class AppModule {}
