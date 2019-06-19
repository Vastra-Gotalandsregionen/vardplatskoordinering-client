import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Definition } from '../../domain/Definition';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-definition-card',
  templateUrl: './definition-card.component.html',
  styleUrls: ['./definition-card.component.scss']
})
export class DefinitionCardComponent implements OnInit {

  @Input() key: string;

  definition: Definition;

  constructor(private http: HttpClient,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.http.get<Definition>(`/api/definition/key/${this.key}`).subscribe(definition => this.definition = definition);
  }

  getHtml(htmlText: string) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlText);
  }
}
