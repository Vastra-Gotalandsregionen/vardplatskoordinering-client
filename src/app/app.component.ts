import { Component, Inject, ViewContainerRef } from '@angular/core';
import { ErrorDialogService } from './service/error-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vardplatskoordinering-client';


  constructor(@Inject(ErrorDialogService) errorDialogService,
              @Inject(ViewContainerRef) viewContainerRef) {
    errorDialogService.setRootViewContainerRef(viewContainerRef);
  }
}
