import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-safe-recaptcha',
  template: `
    <div [formGroup]="parentFormGroup">
      <ngx-recaptcha2 *ngIf="isBrowser"
        [siteKey]="siteKey"
        formControlName="recaptcha">
      </ngx-recaptcha2>
    </div>
  `,
})
export class SafeRecaptchaComponent {
  isBrowser: boolean;
  siteKey: string = "6Leq9QwqAAAAABQlBJJFeGmzuuKBroLu_QQx45MZ"; // Replace with your actual site key
  @Input() parentFormGroup!: FormGroup;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
