import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private currentManagementId = new BehaviorSubject<number>(null);

  constructor() { }

  public setManagementId(managementId: number) {
    this.currentManagementId.next(managementId);
  }

  public getManagementId() {
    return this.currentManagementId.asObservable();
  }
}
