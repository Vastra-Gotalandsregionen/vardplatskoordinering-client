import { DataSource } from '@angular/cdk/table';
import { RegistreraAggregate } from '../domain/RegistreraAggregate';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CollectionViewer } from '@angular/cdk/collections';
import { PageResponse } from '../domain/PageResponse';

export class RegistreraAggregatesDataSource implements DataSource<RegistreraAggregate> {
  private registreraAggregatesSubject = new BehaviorSubject<RegistreraAggregate[]>([]);

  private _count = new BehaviorSubject(0);
  private _currentPage = 0;

  constructor(private http: HttpClient, private datum: string, private managementId: number) {
  }

  connect(collectionViewer: CollectionViewer): Observable<RegistreraAggregate[] | ReadonlyArray<RegistreraAggregate>> {
    return this.registreraAggregatesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.registreraAggregatesSubject.complete();
  }

  load(page: number) {
    this._currentPage = page;
    this.http.get('/api/registreraAggregate?management=' + this.managementId + '&page=' + page + (this.datum ? '&datum=' + this.datum : ''))
      .subscribe((pageResponse: PageResponse<RegistreraAggregate[]>) => {
        this.registreraAggregatesSubject.next(pageResponse.content);
        this._count.next(pageResponse.totalElements);
      });
  }

  get count() {
    return this._count;
  }

  get currentPage(): number {
    return this._currentPage;
  }

}
