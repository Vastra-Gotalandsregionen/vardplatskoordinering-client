import {MatPaginatorIntl} from '@angular/material';
import { getFactoryOf } from '@angular/core/src/render3';

export class MatPaginatorIntlSv extends MatPaginatorIntl {
  itemsPerPageLabel = 'Poster per sida';
  nextPageLabel     = 'Nästa';
  previousPageLabel = 'Föregående';
  firstPageLabel = 'Första';
  lastPageLabel = 'Sista';
  


  getRangeLabel = (page: number, pageSize: number, length: number):string => {
    if (length === 0 || pageSize === 0) {
      return `0 av ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} av ${length}`;
  };

  

}
