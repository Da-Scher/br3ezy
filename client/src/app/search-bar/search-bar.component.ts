import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = "";

  @Output() search = new EventEmitter<string>();

  onSubmit(query: string) {
    this.search.emit(query);
  }
}
