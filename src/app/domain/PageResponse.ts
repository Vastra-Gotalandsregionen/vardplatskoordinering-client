export class PageResponse<T> {
  content: T;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totapPages: number;
}

class Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

class Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}
