import { ComponentFactoryResolver, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from '../elements/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  private rootViewContainer: ViewContainerRef;

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver) { }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  showErrorDialog(error: HttpErrorResponse) {
    const factory = this.factoryResolver.resolveComponentFactory(ErrorDialogComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);

    this.setErrorMessage(component, error);

    const viewRef = component.hostView;
    this.rootViewContainer.insert(viewRef);

    component.instance.setCloseCallback(() => {
      this.rootViewContainer.remove(this.rootViewContainer.indexOf(viewRef));
    });
  }

  private setErrorMessage(component, error: HttpErrorResponse) {
    let errorMessage;

    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Tekniskt fel';
    }

    component.instance.setErrorMessage(errorMessage) ;
  }
}
