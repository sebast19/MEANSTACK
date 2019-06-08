import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { DisplayMessageService } from "src/app/components/display-message/display-message.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  emailValid: boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router,
    private _displayMessageService: DisplayMessageService
  ) {}

  ngOnInit() {
    this.formRegister = new FormGroup(
      {
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        cpassword: new FormControl(null, [Validators.required])
      },
      { validators: this.verifyPassword("password", "cpassword") }
    );

    this.verifyEmail();
  }

  verifyEmail() {
    this.formRegister.valueChanges.subscribe(value => {
      let email = value.email;

      if (email != "") {
        this._userService.searchUser(email).subscribe((res: any) => {
          if (res != null) {
            this.emailValid = true;
          } else {
            this.emailValid = false;
          }
        });
      } else {
        this.emailValid = false;
      }
    });
  }

  verifyPassword(pass1: string, pass2: string) {
    return (group: FormGroup) => {
      let value1 = group.controls[pass1].value;
      let value2 = group.controls[pass2].value;

      if (value1 === value2) return null;

      return {
        areNotEqual: true
      };
    };
  }

  register() {
    if (this.formRegister.valid) {
      let user = {
        firstName: this.formRegister.value.firstName,
        lastName: this.formRegister.value.lastName,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password
      };

      this._displayMessageService.configModal(true, "", "", true);

      this._userService.register(user).subscribe(
        (res: any) => {
          this.formRegister.reset();
          this._displayMessageService.configModal(
            true,
            "fine",
            "User Registered Succesfully",
            false
          );
          setTimeout(() => this.router.navigate(["/login"]), 1500);
        },
        err => {
          console.log(err);
          this._displayMessageService.configModal(
            true,
            "error",
            err.error.message,
            false
          );
        }
      );
    }
  }
}
