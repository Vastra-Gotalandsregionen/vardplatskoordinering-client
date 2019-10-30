import { NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Injectable()
export class SwedishDateAdapter extends NativeDateAdapter {
  constructor() {
    super('sv-SE', new Platform());
  }

  getFirstDayOfWeek(): number {
    return 1;
  }
}
