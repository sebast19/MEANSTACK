import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "./services/user.service";
import { RegisterComponent } from "./login/register/register.component";
import { DisplayMessageComponent } from "./components/display-message/display-message.component";
import { DisplayMessageService } from "./components/display-message/display-message.service";
import { HeaderComponent } from "./shared/header/header.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { BeautyRolePipe } from "./pipes/beauty-role.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DisplayMessageComponent,
    HeaderComponent,
    DashboardComponent,
    BeautyRolePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, DisplayMessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
