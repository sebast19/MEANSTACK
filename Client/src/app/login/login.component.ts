import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

import { UserService } from "../services/user.service";
import { DisplayMessageService } from "../components/display-message/display-message.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  remember: boolean = false;
  email: string;

  is_disconnect: boolean = false;

  constructor(
    private _userService: UserService,
    private _displayMessageService: DisplayMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 1) this.remember = true;
  }

  login(form: NgForm) {
    this._displayMessageService.configModal(true, "", "", true);

    this._userService
      .login(form.value.email, form.value.password, form.value.remember)
      .subscribe(
        (res: any) => {
          this._displayMessageService.configModal(
            true,
            "fine",
            "Logued Succesfully",
            false
          );

          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.data));

          setTimeout(() => this.router.navigate(["/dashboard"]), 1500);
        },
        err => {
          this._displayMessageService.configModal(
            true,
            "error",
            err.error.message,
            false
          );
          if (err.error.loaded === 0) this.is_disconnect = true;
        }
      );
  }
}
