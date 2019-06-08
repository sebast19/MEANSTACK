import { Component, OnInit } from "@angular/core";

import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  loading: boolean = true;
  page: number = 1;
  totalUsers: number = 0;
  from: number = 0;
  disabledNext: boolean = false;
  disabledPrev: boolean = true;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  searchUser(value: string) {
    if (value === "") {
      this.getUsers();
    } else {
      this._userService.searchUser(value).subscribe((res: any) => {
        this.users = res.data;
      });
    }
  }

  getUsers() {
    this._userService.getUsers(this.from).subscribe((res: any) => {
      this.loading = false;
      this.users = res.data;
      this.totalUsers = res.total;
    });
  }

  pagination(value: number) {
    let from = this.from + value;

    from >= this.totalUsers - 7
      ? (this.disabledNext = true)
      : (this.disabledNext = false);

    from === 0 ? (this.disabledPrev = true) : (this.disabledPrev = false);

    if (from >= this.totalUsers) return;
    if (from < 0) return;

    if (from > this.from) this.page++;
    if (from < this.from) this.page--;

    this.from += value;
    this.getUsers();
  }
}
