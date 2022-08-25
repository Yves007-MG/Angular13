import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  userForm!: FormGroup;
  

  constructor(private formBulder: FormBuilder,
              private userService: UserService,
              private router:Router) { }

  ngOnInit(): void {
      this.initForm();
  }

  initForm(){
    this.userForm = this.formBulder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      drinkPreference: ['',Validators.required],
      hobbies: this.formBulder.array([])
    });
  }
  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue['firstName'],
      formValue['lastName'],
      formValue['email'],
      formValue['drinkPreference'],
      formValue['hobbies']? formValue['hobbies']:[],
    );
    this.userService.addUser(newUser)
    this.router.navigate(['/users']);

  }

  getHobbies(){
    return this.userForm.get('hobbies') as FormArray;

  }
  onAddHobbies(){
    const newHobbyControl = this.formBulder.control('',Validators.required);
    this.getHobbies().push(newHobbyControl);
  }
}
