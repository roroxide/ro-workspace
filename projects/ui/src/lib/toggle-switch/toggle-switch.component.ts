import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="relative inline-flex items-center" 
           [class.cursor-pointer]="!disabled" 
           [class.opacity-50]="disabled">
      
      <input type="checkbox" 
             class="sr-only peer" 
             [checked]="checked" 
             [disabled]="disabled"
             (change)="onToggle($event)">
      
      <div class="bg-gray-200 rounded-full peer 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:transition-all peer-checked:bg-[var(--toggle-color)]"
           [class]="sizeClasses"
           [style.--toggle-color]="color">
      </div>
    </label>
  `
})
export class ToggleSwitchComponent {
  @Input() color: string = '#2563eb';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;

  // EventEmitter برای ارسال وضعیت به والد
  @Output() toggleChange = new EventEmitter<boolean>();

  onToggle(event: Event) {
    if (!this.disabled) {
      const inputElement = event.target as HTMLInputElement;
      this.checked = inputElement.checked;
      this.toggleChange.emit(this.checked);
    }
  }

  get sizeClasses(): string {
    const sizes = {
      sm: 'w-9 h-5 after:h-4 after:h-4', // اصلاح سایز دایره کوچک
      md: 'w-11 h-6 after:h-5 after:h-5',
      lg: 'w-14 h-7 after:h-6 after:h-6'
    };
    return sizes[this.size];
  }
}

/**
 * How to use
 
handleToggle(status: boolean) {
  this.isWalletEnabled = status;
}

 */