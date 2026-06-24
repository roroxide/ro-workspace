import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss' // یا .css بر اساس پروژه شما
})
export class HeaderComponent {
  // فرستادن سیگنال کلیک روی دکمه همبرگری به خارج از کامپوننت
  @Output() menuClicked = new EventEmitter<void>();

  toggleMenu() {
    this.menuClicked.emit();
  }
}
