import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CONFIG } from "../config/config";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string, remember: boolean = false) {
    let url = `${CONFIG.uri}/auth/login`;

    return this.http.post(url, { email, pass: password }).pipe((res: any) => {
      if (remember) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }

      return res;
    });
  }

  register(user: any) {
    let url = `${CONFIG.uri}/users/`;

    return this.http.post(url, user);
  }

  getUsers(from: number) {
    let url = `${CONFIG.uri}/users/?from=${from}`;

    return this.http.get(url);
  }

  searchUser(term: string) {
    let url = `${CONFIG.uri}/users/search/${term}`;

    return this.http.get(url);
  }
}
