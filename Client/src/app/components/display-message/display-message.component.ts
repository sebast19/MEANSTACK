import { Component, OnInit } from "@angular/core";
import { DisplayMessageService } from "./display-message.service";

@Component({
  selector: "app-display-message",
  templateUrl: "./display-message.component.html",
  styleUrls: ["./display-message.component.scss"]
})
export class DisplayMessageComponent implements OnInit {
  visible: boolean = false;
  type: string = "";
  message: string = "";
  loading: boolean = true;

  constructor(private _displayMessageService: DisplayMessageService) {}

  ngOnInit() {
    this._displayMessageService.notification.subscribe((res: any) => {
      this.visible = res.visible;
      this.type = res.type;
      this.message = res.message;
      this.loading = res.loading;

      setTimeout(() => (this.visible = false), 1500);
    });
  }
}
