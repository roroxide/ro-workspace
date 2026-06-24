import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { CategoriesModalComponent } from './components/categories-modal/categories-modal.component'; // ۱. امپورت مودال جدید
import { Category, TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, KanbanBoardComponent, NewTaskModalComponent,
    CategoriesModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: '../styles.scss'
})
export class AppComponent implements OnInit {
  title = "rotod";
  isSidebarOpen = false;
  isNewTaskModalOpen = false;
  isCategoriesModalOpen = false;// تعریف متغیر برای استفاده در قالب HTML
  categories: Category[] = [];
  
  // ۱. تزریق سرویس کارهای کانبان در کانستراکتور
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    // ۲. دریافت لیست اولیه دسته‌بندی‌ها از سرویس هنگام لود شدن کامپوننت
    // اگر در سرویس به صورت Observable (مثلا BehaviorSubject) است:
    this.taskService.categories$.subscribe(cats => {
      this.categories = cats;
    });

    // یا اگر در سرویس شما یک آرایه معمولی است، خط بالا را پاک کرده و خط زیر را بنویسید:
    // this.categories = this.taskService.categories;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openNewTaskModal() {
    this.isNewTaskModalOpen = true;
    this.isSidebarOpen = false;
  }

  closeNewTaskModal() {
    this.isNewTaskModalOpen = false;
  }

  openCategoriesModal() { this.isCategoriesModalOpen = true; this.isSidebarOpen = false; }
  closeCategoriesModal() { this.isCategoriesModalOpen = false; }

  handleCreateCategory(newCatData: Omit<Category, "id">) {
    const newCategory: Category = {
      id: 'cat_' + Date.now(), // آی‌دی یکتا
      name: newCatData.name,
      rawColor: newCatData.rawColor
    };

    // اضافه کردن به آرایه برای به‌روزرسانی آنی در کل سیستم (سایدبار و فیلترها)
    this.taskService.addCategory(newCategory);
  }
  
  handleUpdateCategory(updatedCat: Category) {
    // این متد را در TaskService خود صدا بزنید تا سورس اصلی آپدیت شود
    this.taskService.updateCategory(updatedCat); 
  }
}