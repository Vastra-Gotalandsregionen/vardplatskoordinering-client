import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CollectionViewer } from '@angular/cdk/collections';

export class BasicEditDataSource<T> implements DataSource<T> {
  private itemsSubject = new BehaviorSubject<T[]>([]);

  constructor(private http: HttpClient, private resourceUrl: string) {
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.itemsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.itemsSubject.complete();
  }

  load() {
    this.http.get(this.resourceUrl)
      .subscribe((result: T[]) => {
        this.itemsSubject.next(result);
      });
  }

  save(item: any): Observable<T> {
    return this.http.put<T>(this.resourceUrl, item);
  }
}
