import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-chance-stepper',
  templateUrl: './chance-stepper.component.html',
  styleUrls: ['./chance-stepper.component.css']
})
export class ChanceStepperComponent implements OnInit {
  cardGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isEditable = true;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.cardGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }
}
