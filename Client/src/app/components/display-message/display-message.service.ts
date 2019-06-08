import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DisplayMessageService {
  public notification = new EventEmitter<any>();

  constructor() {}

  configModal(
    visible: boolean,
    type: string,
    message: string,
    loading: boolean
  ) {
    const config = {
      visible,
      type,
      message,
      loading
    };

    this.notification.emit(config);
  }
}
