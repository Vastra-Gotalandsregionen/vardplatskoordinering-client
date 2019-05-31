import { ComponentFactoryResolver, Inject, Injectable, ViewContainerRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorDialogComponent } from '../elements/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  private rootViewContainer: ViewContainerRef;
  private shownViewRef = false;

  constructor(@Inject(ComponentFactoryResolver) private factoryResolver) { }

  public setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  showErrorDialog(error: HttpErrorResponse) {
    const factory = this.factoryResolver.resolveComponentFactory(ErrorDialogComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);

    this.setErrorMessage(component, error);

    const viewRef = component.hostView;

    if (this.shownViewRef) {
      this.hideErrorDialog(this.shownViewRef);
    }

    this.rootViewContainer.insert(viewRef);
    this.shownViewRef = viewRef;

    component.instance.setCloseCallback(() => {
      this.hideErrorDialog(viewRef);
    });
  }

  private hideErrorDialog(viewRef) {
    this.rootViewContainer.remove(this.rootViewContainer.indexOf(viewRef));
    this.shownViewRef = null;
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
