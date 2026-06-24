import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Category } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories-modal.component.html',
  styleUrl: './categories-modal.component.scss'
})
export class CategoriesModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();

  categories: Category[] = [];
  editingCatId: string | null = null; // برای تشخیص اینکه کدام سطر در حال ویرایش است
  
  // فیلدهای موقت برای سطر در حال ویرایش
  editName = '';
  editSelectedColor = '';

  // لیست پالت‌های رنگی در دسترس برای انتخاب کاربر
  colorPalette = [
    { raw: 'bg-red-500', color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'indigo', raw: 'bg-indigo-500', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { raw: 'bg-emerald-500', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { raw: 'bg-amber-500', color: 'text-amber-600', bg: 'bg-amber-50' },
    { raw: 'bg-purple-500', color: 'text-purple-600', bg: 'bg-purple-50' },
    { raw: 'bg-pink-500', color: 'text-pink-600', bg: 'bg-pink-50' }
  ];

  private sub = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.sub.add(
      this.taskService.categories$.subscribe(cats => this.categories = cats)
    );
  }

  onClose() {
    this.editingCatId = null;
    this.closeModal.emit();
  }

  startEdit(cat: Category) {
    if (cat.id === 'none') return; // دسته‌بندی پیش‌فرض قابل ویرایش نباشد
    this.editingCatId = cat.id;
    this.editName = cat.name;
    this.editSelectedColor = cat.rawColor;
  }

  cancelEdit() {
    this.editingCatId = null;
  }

  saveEdit(cat: Category) {
    if (!this.editName.trim()) return;

    // پیدا کردن کدهای استایل بر اساس رنگ انتخاب شده از پالت
    const selectedStyle = this.colorPalette.find(p => p.raw === this.editSelectedColor) || this.colorPalette[0];

    this.taskService.updateCategory({
      id: cat.id,
      name: this.editName,
      rawColor: selectedStyle.raw,
      color: selectedStyle.color,
      bg: selectedStyle.bg
    });

    this.editingCatId = null;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}