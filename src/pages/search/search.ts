import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  private formData: FormGroup;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder) {

    this.formData = this.formBuilder.group({
      q: ['', [Validators.required,  Validators.minLength(4)]]
    });

  }

}
