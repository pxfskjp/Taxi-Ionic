import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SettingsPage} from '../settings/settings';
import {SearchPage} from '../search/search';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  searchTab = SearchPage;
  settingsTab = SettingsPage;

  constructor(
    public navCtrl: NavController) {
  }
}
