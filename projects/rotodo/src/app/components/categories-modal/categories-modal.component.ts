import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../services/task.service';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'app-categories-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ColorPickerComponent],
  templateUrl: './categories-modal.component.html'
})
export class CategoriesModalComponent {
  @Input() categories: Category[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() createCategory = new EventEmitter<Omit<Category, 'id'>>();
  @Output() updateCategory = new EventEmitter<Category>(); // رویداد ویرایش

  // وضعیت فرم ایجاد جدید
  isNewCatFormOpen = false;
  newCatName = '';
  newCatColor = 'bg-blue-500';

  // وضعیت فرم ویرایش دسته‌بندی‌های موجود
  editingCategoryId: string | null = null;
  editCatName = '';
  editCatColor = '';

  colorOptions = [
    { rawColor: 'bg-blue-500', bg: 'bg-blue-50', color: 'text-blue-600' },
    { rawColor: 'bg-emerald-500', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { rawColor: 'bg-purple-500', bg: 'bg-purple-50', color: 'text-purple-600' },
    { rawColor: 'bg-orange-500', bg: 'bg-orange-50', color: 'text-orange-600' },
    { rawColor: 'bg-pink-500', bg: 'bg-pink-50', color: 'text-pink-600' }
  ];

  // متدهای بخش ویرایش دسته‌بندی موجود
  startEdit(cat: Category) {
    this.editingCategoryId = cat.id;
    this.editCatName = cat.name;
    this.editCatColor = cat.rawColor || '#3b82f6';
    this.isNewCatFormOpen = false; // بستن فرم ایجاد جدید در صورت باز بودن
  }

  cancelEdit() {
    this.editingCategoryId = null;
  }

  saveEdit() {
    if (!this.editCatName.trim() || !this.editingCategoryId) return;

    // ۱. بررسی اینکه آیا رنگ در لیست پیش‌فرض است یا رنگ کاستوم (Hex)
    const foundColor = this.colorOptions.find(c => c.rawColor === this.editCatColor);
    
    // ۲. اگر رنگ کاستوم است، آبجکت متناظر با آن را بساز
    const colorData = foundColor || { 
      rawColor: this.editCatColor, 
      bg: 'bg-gray-100', 
      color: 'text-gray-800' 
    };

    // ۳. ارسال اطلاعات به والد (سرویس)
    this.updateCategory.emit({
      id: this.editingCategoryId,
      name: this.editCatName,
      rawColor: colorData.rawColor // حالا همیشه مقدار صحیح (حتی اگر Hex باشد) ارسال می‌شود
    });

    // ۴. خروج از حالت ویرایش
    this.editingCategoryId = null;
  }

  // متدهای بخش ساخت دسته‌بندی جدید
  openNewCatForm() {
    this.isNewCatFormOpen = true;
    this.editingCategoryId = null; // خروج از حالت ویرایش دسته‌بندی دیگر
    this.newCatName = '';
    this.newCatColor = 'bg-blue-500';
  }

  saveCategory() {
    if (!this.newCatName.trim()) return;

    // ۱. بررسی اینکه آیا رنگ انتخابی در لیست پیش‌فرض وجود دارد یا خیر
    const foundColor = this.colorOptions.find(c => c.rawColor === this.newCatColor);

    // ۲. اگر در لیست نبود، خودمان یک آبجکت برای رنگ کاستوم می‌سازیم
    const colorData = foundColor || { 
      rawColor: this.newCatColor, 
      bg: 'bg-gray-100', // یا استایل پیش‌فرض برای کاستوم
      color: 'text-gray-800' 
    };

    // ۳. ارسال به والد
    this.createCategory.emit({
      name: this.newCatName,
      rawColor: colorData.rawColor // حالا مطمئن هستیم همیشه یک مقدار داریم
    });

    this.isNewCatFormOpen = false;
    this.newCatName = '';
  }

  onClose() {
    this.close.emit();
  }

  isHex(color: string): boolean {
    // اگر رشته با # شروع شود، یعنی کد Hex است
    return color.startsWith('#');
  }
}