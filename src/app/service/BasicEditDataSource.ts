import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CollectionViewer } from '@angular/cdk/collections';

export class BasicEditDataSource<T> implements DataSource<T> {
  private itemsSubject = new BehaviorSubject<T[]>([]);
  private data: T[];

  private filters: Filter[] = [];

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
        this.data = result;
        this.emitFilteredItems();
      });
  }

  save(item: any): Observable<T> {
    return this.http.put<T>(this.resourceUrl, item);
  }

  delete(item: any): Observable<T> {
    return this.http.delete<T>(this.resourceUrl + '/' + item.id);
  }

  filter(filterToAdd: {field: string, value: string, type: string}) {
    const index = this.filters.findIndex(filter => filter.field === filterToAdd.field);
    if (index > -1) {
      this.filters[index] = filterToAdd;
    } else {
      this.filters.push(filterToAdd);
    }

    this.emitFilteredItems();
  }

  private emitFilteredItems() {
    let filteredItems = this.data;

    this.filters.forEach(filter => {
      filteredItems = filteredItems.filter(item => {
        if (!filter.value) {
          return true; // Don't filter anything out.
        }

        const itemFieldValue = this.getItemFieldValue(item, filter.field);
        if (filter.type === 'match') {
          return itemFieldValue === filter.value;
        } else if (filter.type === 'contains') {
          if (!!itemFieldValue.toLowerCase) {
            return itemFieldValue.toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
          } else {
            return itemFieldValue.indexOf(filter.value) > -1;
          }
        }
      });
    });

    this.itemsSubject.next(filteredItems);
  }

  getItemFieldValue(item: T, fieldName: string): string {
    const parts = fieldName.split('.');

    let currentValue: any = item;
    parts.forEach((part, index) => {
      currentValue = currentValue[part];
    });

    return currentValue;
  }
}

export class Filter {
  field: string;
  value: string;
  type: string;
}
