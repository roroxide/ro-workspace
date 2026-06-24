import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../services/task.service';

@Component({
  selector: 'app-filter-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-toolbar.component.html',
  styleUrl: './filter-toolbar.component.scss'
})
export class FilterToolbarComponent {
  // دریافت لیست دسته‌بندی‌ها از کامپوننت والد
  @Input() categories: Category[] = [];

  // فیلتر متنی (سرچ)
  @Input() searchQuery = '';
  @Output() searchQueryChange = new EventEmitter<string>();

  // فیلتر فوری
  @Input() filterUrgent = false;
  @Output() filterUrgentChange = new EventEmitter<boolean>();

  // فیلتر مهم
  @Input() filterImportant = false;
  @Output() filterImportantChange = new EventEmitter<boolean>();

  // فیلتر دسته‌بندی انتخاب شده
  @Input() selectedFilterCategoryId = 'all';
  @Output() selectedFilterCategoryIdChange = new EventEmitter<string>();

  // اضافه شدن قابلیت بایندینگ دوطرفه مدیریت ستون‌ها
  @Input() columnVisibility = { todo: true, doing: true, done: true };
  @Output() columnVisibilityChange = new EventEmitter<any>();

  // وضعیت‌های داخلی کامپوننت فیلتر
  isFilterModalOpen = false;
  isMobileCatDropdownOpen = false;

  // متغیر وضعیت مودال مدیریت ستون‌ها
  isColumnsModalOpen = false;

  // متد کمکی برای شبیه‌ساز دراپ‌داون موبایل
  getMobileSelectedCategoryName(): string {
    const found = this.categories.find(c => c.id === this.selectedFilterCategoryId);
    return found ? found.name : 'همه دسته‌ها';
  }

  // متدهای انتشار تغییرات به والد (بورد کانبان)
  onSearchChange(value: string) { this.searchQueryChange.emit(value); }
  
  toggleUrgent() {
    this.filterUrgent = !this.filterUrgent;
    this.filterUrgentChange.emit(this.filterUrgent);
  }

  toggleImportant() {
    this.filterImportant = !this.filterImportant;
    this.filterImportantChange.emit(this.filterImportant);
  }

  selectCategory(catId: string) {
    this.selectedFilterCategoryId = catId;
    this.selectedFilterCategoryIdChange.emit(this.selectedFilterCategoryId);
    this.isMobileCatDropdownOpen = false;
  }

  applyMobileFilters() {
    this.isMobileCatDropdownOpen = false;
    this.isFilterModalOpen = false;
  }

  // متد جابه‌جایی وضعیت چشم (نمایش/عدم نمایش) و انتشار آن به والد
  toggleColumn(columnKey: 'todo' | 'doing' | 'done') {
    this.columnVisibility[columnKey] = !this.columnVisibility[columnKey];
    this.columnVisibility = { ...this.columnVisibility };
    this.columnVisibilityChange.emit({ ...this.columnVisibility });
  }
}