import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "beautyRole"
})
export class BeautyRolePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let role = "";

    switch (value) {
      case "ROLE_ADMIN":
        role = "Administrator";
        break;
      case "ROLE_STUDENT":
        role = "Student";
        break;
      case "ROLE_TEACHER":
        role = "Teacher";
        break;
      default:
        role = value;
        break;
    }

    return role;
  }
}
