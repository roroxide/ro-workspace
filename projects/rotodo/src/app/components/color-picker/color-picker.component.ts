import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-wrap gap-2 items-center">
      <label *ngFor="let color of presetColors" class="relative cursor-pointer shrink-0">
        <input type="radio" [value]="color" [(ngModel)]="selectedColor" (ngModelChange)="onChange(color)" class="sr-only" />
        <span [style.background-color]="color" 
              [class.ring-2]="selectedColor === color" 
              class="block w-6 h-6 rounded-full ring-offset-2 ring-indigo-500 transition-all hover:scale-110">
        </span>
      </label>

      <div class="relative w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
           [style.border-color]="selectedColor"
           [style.color]="selectedColor">
        
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9s1.5.67 1.5 1.5S7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3.5 4c-.83 0-1.5-.67-1.5-1.5S17.17 9 18 9s1.5.67 1.5 1.5S18.83 12 18 12z"/>
        </svg>

        <input type="color" 
               [ngModel]="selectedColor" 
               (ngModelChange)="onChange($event)" 
               class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
      </div>
    </div>
  `
})
export class ColorPickerComponent implements OnChanges {
  @Input() selectedColor: string = '#3b82f6';
  @Output() selectedColorChange = new EventEmitter<string>();

  presetColors = ['#3b82f6', '#10b981', '#a855f7', '#f97316', '#ec4899', '#ef4444'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedColor']) {
      console.log(changes['selectedColor'].currentValue)
      // هر زمان والد مقدار جدیدی فرستاد، این متغیر آپدیت می‌شود
      this.selectedColor = changes['selectedColor'].currentValue || '#3b82f6';
    }
  }

  onChange(hex: string) {
    this.selectedColor = hex;
    this.selectedColorChange.emit(hex);
  }
}