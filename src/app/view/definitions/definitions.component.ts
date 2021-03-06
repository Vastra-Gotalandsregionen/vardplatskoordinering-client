import { Component, OnInit } from '@angular/core';
import { Definition } from '../../domain/Definition';
import { HttpClient } from '@angular/common/http';
import 'rxjs-compat/add/operator/finally';

@Component({
  selector: 'app-definitions',
  templateUrl: './definitions.component.html',
  styleUrls: ['./definitions.component.scss']
})
export class DefinitionsComponent implements OnInit {

  displayedColumns = ['definition', 'beskrivning'];
  isLoading = true;
  definitionList: Definition[] = [];

  constructor(private http: HttpClient) { }

  /*ngOnInit() {
    this.http.get<Definition[]>('/api/definition?public=true').subscribe(definitionList => {
      this.definitionList = definitionList;
      this.isLoading = false;
    });
  }*/

  ngOnInit() {
    this.http.get<Definition[]>('/api/definition?public=true')
      .finally(() => {
        this.isLoading = false;
      }
    ).subscribe(definitionList => {
      this.definitionList = definitionList;
    });
  }
}
