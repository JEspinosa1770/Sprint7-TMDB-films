import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-buttons-nav',
  imports: [],
  templateUrl: './buttons-nav.html',
  styleUrl: './buttons-nav.css',
})
export class ButtonsNav {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  isLoading = input.required<boolean>();

  previousPageEvent = output<void>();
  nextPageEvent = output<void>();
  goToPageEvent = output<number>();

  previousPage() {
    if (this.currentPage() > 1 && !this.isLoading()) {
      this.previousPageEvent.emit();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPages() && !this.isLoading()) {
      this.nextPageEvent.emit();
    }
  }

  goToPage(page: number) {
    if (isNaN(page) || page < 1 || page > this.totalPages()) {
      const input = document.querySelector('input[type="number"]') as HTMLInputElement;
      if (input) {
        input.value = this.currentPage().toString();
      }
      return;
    }

    if (page !== this.currentPage()) {
      this.goToPageEvent.emit(page);
    }
  }
}
