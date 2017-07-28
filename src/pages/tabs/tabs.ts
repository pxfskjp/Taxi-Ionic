import {Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {SettingsPage} from '../settings/settings';
import {SearchPage} from '../search/search';
import {LanguagePage} from '../language/language';
import {ConfigService} from '../../providers/config-service/config-service';
import _ from "lodash";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  searchTab = SearchPage;
  settingsTab = SettingsPage;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public configService: ConfigService) {
  }

  ionViewWillEnter() {

    this.configService.getAll().then(data => {

      if (_.isEmpty(data)) {
        /**
         * In this case, the user starts the application for the first time.
         * 1. Save the default data in local storage (available languages, etc.)
         * 2. Redirect to language selection page
         */
        this.configService.loadDefaultData().then(data => {
          //go to language selection 
          let languageModal = this.modalCtrl.create(LanguagePage, data, {
            cssClass: 'language-modal'
          });
          languageModal.present();
        });
      } else {
        /**
         * The user has already used the application at least once, so we 
         * have all the necessary data in the storage. Just set the language 
         * for the current session.
         */
        this.configService.setSessionData(data);
      }
    });
  }


}
